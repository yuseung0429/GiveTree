package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.account.domain.AccountTransferResponse;
import com.dareuda.givetree.account.domain.DepositProcessor;
import com.dareuda.givetree.account.domain.RefundFailureAppender;
import com.dareuda.givetree.account.domain.RefundProcessor;
import com.dareuda.givetree.ledger.domain.Ledger;
import com.dareuda.givetree.transaction.domain.Transaction;
import com.dareuda.givetree.transaction.domain.TransactionUpdater;
import com.dareuda.givetree.wallet.domain.MemberWalletReader;
import com.dareuda.givetree.wallet.domain.Wallet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

@Component
@RequiredArgsConstructor
public class TokenCharger {

    private final TransactionUpdater transactionUpdater;
    private final DepositProcessor depositProcessor;
    private final RefundProcessor refundProcessor;
    private final TokenMinter tokenMinter;
    private final MemberWalletReader memberWalletReader;
    private final RefundFailureAppender refundFailureAppender;

    public void charge(long memberId, long amount, String simplePassword) {
        AccountTransferResponse depositResponse = depositProcessor.process(memberId, amount, simplePassword);
        Ledger depositLedger = depositProcessor.saveLedger(memberId, amount, depositResponse);
        try {
            Wallet wallet = memberWalletReader.readByMemberId(memberId);
            TransactionReceipt mintReceipt = tokenMinter.mint(wallet.getId(), amount);
            Transaction mintTransaction = tokenMinter.saveTransaction(wallet.getId(), amount, mintReceipt);
            transactionUpdater.updateLedgerId(mintTransaction.getId(), depositLedger.getId());
        } catch (Exception e1) {
            try {
                AccountTransferResponse refundResponse = refundProcessor.process(memberId, amount);
                refundProcessor.saveLedger(memberId, amount, refundResponse);
            } catch (Exception e2) {
                refundFailureAppender.append(depositLedger.getId(), amount);
            }
        }
    }
}
