package com.dareuda.givetree.history.service;

import com.dareuda.givetree.history.domain.LedgerInfo;
import com.dareuda.givetree.history.domain.LedgerInfoReader;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LedgerService {

    private final LedgerInfoReader ledgerInfoReader;

    public Page<LedgerInfo> getMemberLedgerInfos(long memberId, Pageable pageable) {
        return ledgerInfoReader.readByMemberId(memberId, pageable);
    }
}
