package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.foundation.infrastructure.FoundationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class FoundationReader {
    private final FoundationRepository foundationRepository;

    @Transactional(readOnly = true)
    public Foundation read(long foundationId) {
        return foundationRepository.findById(foundationId)
                .orElseThrow(() -> new RuntimeException("failed to read foundation"));
    }

    @Transactional(readOnly = true)
    public Foundation readByMemberId(long memberId) {
        return foundationRepository.findByMemberId(memberId)
                .orElseThrow(() -> new RuntimeException("failed to read foundation with memberId"));
    }
}
