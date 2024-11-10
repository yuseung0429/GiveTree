package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.account.infrastructure.ExchangeFailureRepository;
import com.dareuda.givetree.account.infrastructure.RefundFailureRepository;
import com.dareuda.givetree.ledger.domain.Ledger;
import com.dareuda.givetree.ledger.domain.LedgerReader;
import com.dareuda.givetree.transaction.domain.Transaction;
import com.dareuda.givetree.transaction.domain.TransactionReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ExchangeFailureAppender {

    private final TransactionReader transactionReader;
    private final ExchangeFailureRepository exchangeFailureRepository;

    public void append(long transactionId, long amount) {
        Transaction transaction = transactionReader.read(transactionId);
        exchangeFailureRepository.save(
                ExchangeFailure.builder()
                        .transaction(transaction)
                        .amount(amount)
                        .build()
        );
    }
}
