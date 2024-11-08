package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.account.infrastructure.RefundFailureRepository;
import com.dareuda.givetree.ledger.domain.Ledger;
import com.dareuda.givetree.ledger.domain.LedgerReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RefundFailureAppender {

    private final LedgerReader ledgerReader;
    private final RefundFailureRepository refundFailureRepository;

    public void append(long ledgerId, long amount) {
        Ledger ledger = ledgerReader.read(ledgerId);
        refundFailureRepository.save(
                RefundFailure.builder()
                        .ledger(ledger)
                        .amount(amount)
                        .build()
        );
    }
}
