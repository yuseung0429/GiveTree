package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.account.infrastructure.RefundFailureRepository;
import com.dareuda.givetree.history.domain.Ledger;
import com.dareuda.givetree.history.domain.LedgerReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class RefundFailureAppender {

    private final LedgerReader ledgerReader;
    private final RefundFailureRepository refundFailureRepository;

    @Transactional
    public void append(long ledgerId, long amount) {
        Ledger ledger = ledgerReader.read(ledgerId);
        RefundFailure refundFailure = RefundFailure.builder()
                .ledger(ledger)
                .amount(amount)
                .build();
        refundFailureRepository.save(refundFailure);
    }
}
