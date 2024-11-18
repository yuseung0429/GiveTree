package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.account.domain.AccountTransferResponse;
import com.dareuda.givetree.account.domain.AccountValidator;
import com.dareuda.givetree.account.domain.ExchangeFailureAppender;
import com.dareuda.givetree.account.domain.WithdrawalProcessor;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.history.domain.Ledger;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.history.domain.TransactionLedgerAppender;
import com.dareuda.givetree.history.domain.TransactionType;
import com.dareuda.givetree.token.controller.TokenErrorCode;
import com.dareuda.givetree.wallet.domain.Wallet;
import com.dareuda.givetree.wallet.domain.WalletVO;
import com.dareuda.givetree.wallet.domain.member.MemberWalletReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

@Component
@RequiredArgsConstructor
public class TokenExchanger {

    private final TokenBurner tokenBurner;
    private final WithdrawalProcessor withdrawalProcessor;
    private final ExchangeFailureAppender exchangeFailureAppender;
    private final TransactionLedgerAppender transactionLedgerAppender;
    private final MemberWalletReader memberWalletReader;
    private final TokenValidator tokenValidator;

    public long exchange(long memberId, long amount, String message) {
        tokenValidator.validateExchangeable(memberId);
        Wallet wallet = memberWalletReader.readByMemberId(memberId);
        TransactionReceipt burnReceipt = tokenBurner.burn(WalletVO.from(wallet), amount);
        Transaction burnTransaction = tokenBurner.saveTransaction(
                wallet.getId(),
                amount,
                TransactionType.EXCHANGE,
                burnReceipt
        );
        try {
            withdrawalProcessor.process(memberId, amount);
            Ledger ledger = withdrawalProcessor.saveLedger(memberId, amount, message);
            transactionLedgerAppender.append(burnTransaction.getId(), ledger.getId());
            return ledger.getId();
        } catch (Exception e) {
            exchangeFailureAppender.append(burnTransaction.getId(), amount);
            throw new RestApiException(TokenErrorCode.TOKEN_EXCHANGE_FAILURE);
        }
    }
}
