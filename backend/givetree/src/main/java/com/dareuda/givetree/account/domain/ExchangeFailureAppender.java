package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.account.infrastructure.ExchangeFailureRepository;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.history.domain.TransactionReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ExchangeFailureAppender {

    private final TransactionReader transactionReader;
    private final ExchangeFailureRepository exchangeFailureRepository;

    public void append(long transactionId, long amount) {
        Transaction transaction = transactionReader.read(transactionId);
        ExchangeFailure exchangeFailure = ExchangeFailure.builder()
                .transaction(transaction)
                .amount(amount)
                .build();
        exchangeFailureRepository.save(exchangeFailure);
    }
}
