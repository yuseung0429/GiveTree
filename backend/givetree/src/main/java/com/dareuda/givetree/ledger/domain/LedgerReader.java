package com.dareuda.givetree.ledger.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.ledger.controller.LedgerErrorCode;
import com.dareuda.givetree.ledger.infrastructure.LedgerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LedgerReader {

    private final LedgerRepository ledgerRepository;

    public Ledger read(long ledgerId) {
        return ledgerRepository.findById(ledgerId)
                .orElseThrow(() -> new RestApiException(LedgerErrorCode.LEDGER_NOT_FOUND));
    }
}
