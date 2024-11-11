package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.account.domain.AccountTransferResponse;
import com.dareuda.givetree.account.domain.ExchangeFailureAppender;
import com.dareuda.givetree.account.domain.WithdrawalProcessor;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.history.domain.Ledger;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.history.domain.TransactionLedgerAppender;
import com.dareuda.givetree.token.controller.TokenErrorCode;
import com.dareuda.givetree.wallet.domain.Wallet;
import com.dareuda.givetree.wallet.domain.WalletReader;
import com.dareuda.givetree.wallet.domain.WalletVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

@Component
@RequiredArgsConstructor
public class TokenExchanger {

    private final TokenBurner tokenBurner;
    private final WalletReader walletReader;
    private final WithdrawalProcessor withdrawalProcessor;
    private final ExchangeFailureAppender exchangeFailureAppender;
    private final TransactionLedgerAppender transactionLedgerAppender;

    public long exchange(long receiverId, long amount) {
        Wallet wallet = walletReader.read(receiverId);
        TransactionReceipt burnReceipt = tokenBurner.burn(WalletVO.from(wallet), amount);
        Transaction burnTransaction = tokenBurner.saveTransaction(wallet.getId(), amount, burnReceipt);
        try {
            AccountTransferResponse withdrawalResponse  = withdrawalProcessor.process(wallet.getId(), amount);
            Ledger ledger = withdrawalProcessor.saveLedger(receiverId, amount, withdrawalResponse);
            transactionLedgerAppender.append(burnTransaction.getId(), ledger.getId());
            return ledger.getId();
        } catch (Exception e) {
            exchangeFailureAppender.append(burnTransaction.getId(), amount);
            throw new RestApiException(TokenErrorCode.TOKEN_EXCHANGE_FAILURE);
        }
    }
}
