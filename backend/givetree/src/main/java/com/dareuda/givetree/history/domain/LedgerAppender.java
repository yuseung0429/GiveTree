package com.dareuda.givetree.history.domain;

import com.dareuda.givetree.account.domain.AccountReader;
import com.dareuda.givetree.history.infrastructure.LedgerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class LedgerAppender {

    private final AccountReader accountReader;

    private final LedgerRepository ledgerRepository;

    public Ledger append(long accountId, long amount, LedgerType ledgerType, LocalDateTime processedAt) {
        return ledgerRepository.save(
                Ledger.builder()
                    .account(accountReader.read(accountId))
                    .amount(amount)
                    .type(ledgerType)
                    .processedAt(processedAt)
                    .build()
        );
    }
}
