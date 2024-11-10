package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.account.domain.AccountTransferResponse;
import com.dareuda.givetree.account.domain.ExchangeFailureAppender;
import com.dareuda.givetree.account.domain.WithdrawalProcessor;
import com.dareuda.givetree.ledger.domain.Ledger;
import com.dareuda.givetree.transaction.domain.Transaction;
import com.dareuda.givetree.transaction.domain.TransactionUpdater;
import com.dareuda.givetree.wallet.domain.Wallet;
import com.dareuda.givetree.wallet.domain.WalletReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

@Component
@RequiredArgsConstructor
public class TokenExchanger {

    private final TokenBurner tokenBurner;
    private final WalletReader walletReader;
    private final WithdrawalProcessor withdrawalProcessor;
    private final TransactionUpdater transactionUpdater;
    private final ExchangeFailureAppender exchangeFailureAppender;

    public void exchange(long receiverId, long amount) {
        Wallet wallet = walletReader.read(receiverId);
        TransactionReceipt burnReceipt = tokenBurner.burn(wallet.getId(), amount);
        Transaction burnTransaction = tokenBurner.saveTransaction(wallet.getId(), amount, burnReceipt);
        try {
            AccountTransferResponse withdrawalResponse  = withdrawalProcessor.process(wallet.getId(), amount);
            Ledger ledger = withdrawalProcessor.saveLedger(receiverId, amount, withdrawalResponse);
            transactionUpdater.updateLedgerId(burnTransaction.getId(), ledger.getId());
        } catch (Exception e) {
            exchangeFailureAppender.append(burnTransaction.getId(), amount);
        }
    }
}
