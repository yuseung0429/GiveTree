package com.dareuda.givetree.transaction.domain;

import com.dareuda.givetree.ledger.domain.LedgerReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class TransactionUpdater {

    private final TransactionReader transactionReader;
    private final LedgerReader ledgerReader;

    @Transactional
    public void updateLedgerId(long transactionId, long ledgerId) {
        Transaction transaction = transactionReader.read(transactionId);
        transaction.recordLedger(ledgerReader.read(ledgerId));
    }

}
