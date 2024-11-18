package com.dareuda.givetree.history.domain;

import com.dareuda.givetree.history.infrastructure.TransactionLedgerRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TransactionLedgerReader {

    private TransactionLedgerRepository transactionLedgerRepository;

    public boolean existsByTransactionIds(List<Long> transactionIds) {
        return transactionLedgerRepository.existsByTransactionIds(transactionIds);
    }
}
