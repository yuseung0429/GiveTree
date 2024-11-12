package com.dareuda.givetree.history.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.history.controller.LedgerErrorCode;
import com.dareuda.givetree.history.infrastructure.LedgerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LedgerReader {

    private final LedgerRepository ledgerRepository;

    public Ledger read(long ledgerId) {
        return ledgerRepository.findById(ledgerId)
                .orElseThrow(() -> new RestApiException(LedgerErrorCode.LEDGER_NOT_FOUND));
    }

    public Page<Ledger> readByMemberId(long memberId, Pageable pageable) {
        return ledgerRepository.findByMemberId(memberId, pageable);
    }

}
