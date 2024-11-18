package com.dareuda.givetree.history.domain;

import com.dareuda.givetree.common.utils.ListUtils;
import com.dareuda.givetree.history.infrastructure.TransactionLedgerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TransactionLedgerAppender {

    private final TransactionLedgerRepository transactionLedgerRepository;
    private final TransactionReader transactionReader;
    private final LedgerReader ledgerReader;

    @Transactional
    public void append(long transactionId, long ledgerId) {
        Transaction transaction = transactionReader.read(transactionId);
        Ledger ledger = ledgerReader.read(ledgerId);

        TransactionLedger transactionLedger = TransactionLedger.builder()
                .transaction(transaction)
                .ledger(ledger)
                .build();

        transactionLedgerRepository.save(transactionLedger);
    }

    @Transactional
    public void appendAll(List<Long> transactionIds, long ledgerId) {
        List<Transaction> transactions = transactionReader.readAll(transactionIds);
        Ledger ledger = ledgerReader.read(ledgerId);

        List<TransactionLedger> transactionLedgers = new ArrayList<>();

        for (Transaction transaction : transactions) {
            transactionLedgers.add(TransactionLedger.builder()
                    .transaction(transaction)
                    .ledger(ledger)
                    .build());
        }
        transactionLedgerRepository.saveAll(transactionLedgers);
    }
}
