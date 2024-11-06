package com.dareuda.givetree.foundation.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class FoundationDetailReader {
    private final FoundationReader foundationReader;

    @Transactional(readOnly = true)
    public FoundationDetail read(long foundationId) {
        Foundation foundation = foundationReader.read(foundationId);

        return FoundationDetail.builder()
                .introduction(foundation.getIntroduction())
                .corporateRegistrationNumber(foundation.getCorporateRegistrationNumber())
                .build();
    }

    @Transactional(readOnly = true)
    public FoundationDetail readByMemberId(long memberId) {
        Foundation foundation = foundationReader.readByMemberId(memberId);

        return read(foundation.getId());
    }
}
