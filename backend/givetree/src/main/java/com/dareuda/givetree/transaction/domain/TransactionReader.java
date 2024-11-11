package com.dareuda.givetree.transaction.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.ledger.controller.TransactionErrorCode;
import com.dareuda.givetree.transaction.infrastructure.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TransactionReader {

    private final TransactionRepository transactionRepository;

    public Transaction read(long transactionId) {
        return transactionRepository.findById(transactionId)
                .orElseThrow(()-> new RestApiException(TransactionErrorCode.TRANSACTION_NOT_FOUND));
    }
}
