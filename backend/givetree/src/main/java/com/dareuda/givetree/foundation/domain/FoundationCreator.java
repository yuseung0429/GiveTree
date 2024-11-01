package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.foundation.controller.dto.request.CreateFoundationRequest;
import com.dareuda.givetree.foundation.infrastructure.FoundationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class FoundationCreator {
    private final FoundationRepository foundationRepository;

    @Transactional
    public long create(CreateFoundationRequest request) {
        Foundation foundation = Foundation.builder()
                .introduction(request.getIntroduction())
                .corporateRegistrationNumber(request.getCorporateRegistrationNumber())
                .build();
        foundation = foundationRepository.save(foundation);

        return foundation.getId();
    }
}
