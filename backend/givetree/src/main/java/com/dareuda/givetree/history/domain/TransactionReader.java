package com.dareuda.givetree.history.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.history.controller.TransactionErrorCode;
import com.dareuda.givetree.history.infrastructure.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TransactionReader {

    private final TransactionRepository transactionRepository;

    public Transaction read(long transactionId) {
        return transactionRepository.findById(transactionId)
                .orElseThrow(()-> new RestApiException(TransactionErrorCode.TRANSACTION_NOT_FOUND));
    }

    public List<Transaction> readAll(List<Long> transactionIds) {
        return transactionRepository.findByIds(transactionIds);
    }

    public List<Transaction> readUnreceivedTransactionByReceiverWalletIdAndTransactionIds(long receiverWalletId, List<Long> transactionIds) {
        return transactionRepository.findUnreceivedTransactionByReceiverWalletIdAndTransactionIds(receiverWalletId, transactionIds);
    }
}
