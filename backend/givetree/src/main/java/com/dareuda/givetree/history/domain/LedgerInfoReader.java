package com.dareuda.givetree.history.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LedgerInfoReader {

    private final LedgerReader ledgerReader;

    public Page<LedgerInfo> readByMemberId(long memberId, Pageable pageable) {
        Page<Ledger> ledgers = ledgerReader.readByMemberId(memberId, pageable);
        return ledgers.map(LedgerInfo::from);
    }
}
