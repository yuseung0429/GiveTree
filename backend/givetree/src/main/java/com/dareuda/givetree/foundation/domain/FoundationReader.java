package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.foundation.controller.FoundationErrorCode;
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
                .orElseThrow(() -> new RestApiException(FoundationErrorCode.FOUNDATION_NOT_FOUND));
    }

    public boolean isExist(long foundationId) {
        return foundationRepository.existsById(foundationId);
    }
}
