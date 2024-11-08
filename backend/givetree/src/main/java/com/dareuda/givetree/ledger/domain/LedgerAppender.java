package com.dareuda.givetree.ledger.domain;

import com.dareuda.givetree.account.domain.AccountReader;
import com.dareuda.givetree.ledger.infrastructure.LedgerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class LedgerAppender {

    private final AccountReader accountReader;

    private final LedgerRepository ledgerRepository;

    public long append(long accountId, long amount, LedgerType ledgerType, LocalDateTime processedAt) {
        Ledger ledger = Ledger.builder()
                .account(accountReader.read(accountId))
                .amount(amount)
                .type(ledgerType)
                .processedAt(processedAt)
                .build();

        return ledgerRepository.save(ledger).getId();
    }
}
