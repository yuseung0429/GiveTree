package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.account.domain.DepositProcessor;
import com.dareuda.givetree.account.domain.RefundFailureAppender;
import com.dareuda.givetree.account.domain.RefundProcessor;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.history.domain.Ledger;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.history.domain.TransactionLedgerAppender;
import com.dareuda.givetree.history.domain.TransactionType;
import com.dareuda.givetree.token.controller.TokenErrorCode;
import com.dareuda.givetree.wallet.domain.member.MemberWalletReader;
import com.dareuda.givetree.wallet.domain.Wallet;
import com.dareuda.givetree.wallet.domain.WalletVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

@Component
@RequiredArgsConstructor
public class TokenCharger {

    private final TransactionLedgerAppender transactionLedgerAppender;
    private final DepositProcessor depositProcessor;
    private final RefundProcessor refundProcessor;
    private final TokenMinter tokenMinter;
    private final MemberWalletReader memberWalletReader;
    private final RefundFailureAppender refundFailureAppender;
    private final TokenValidator tokenValidator;

    public void charge(long memberId, long amount, String message) {
        tokenValidator.validateChargeable(memberId);
        depositProcessor.process(memberId, amount);
        Ledger depositLedger = depositProcessor.saveLedger(memberId, amount, message);
        try {
            Wallet wallet = memberWalletReader.readByMemberId(memberId);
            TransactionReceipt mintReceipt = tokenMinter.mint(WalletVO.from(wallet), amount);
            Transaction mintTransaction = tokenMinter.saveTransaction(
                    wallet.getId(),
                    amount,
                    TransactionType.CHARGE,
                    mintReceipt
            );
            transactionLedgerAppender.append(mintTransaction.getId(), depositLedger.getId());
        } catch (Exception e1) {
            try {
                refundProcessor.process(memberId, amount);
                refundProcessor.saveLedger(memberId, amount, message);
                throw new RestApiException(TokenErrorCode.TOKEN_CHARGE_FAILURE);
            } catch (Exception e2) {
                refundFailureAppender.append(depositLedger.getId(), amount);
                throw new RestApiException(TokenErrorCode.TOKEN_CHARGE_FAILURE);
            }
        }
    }
}
