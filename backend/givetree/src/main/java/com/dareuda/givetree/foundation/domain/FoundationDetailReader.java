package com.dareuda.givetree.foundation.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FoundationDetailReader {
    private final FoundationReader foundationReader;

    @Transactional(readOnly = true)
    public FoundationDetail read(long foundationId) {
        Foundation foundation = foundationReader.read(foundationId);

        String titleImageUrl = foundation.getTitleImage() != null ? foundation.getTitleImage().getUrl() : null;
        List<String> imageUrls = new ArrayList<>();
        foundation.getImages().forEach(image -> imageUrls.add(image.getImage().getUrl()));

        return FoundationDetail.builder()
                .id(foundation.getId())
                .ownerId(foundation.getOwner().getId())
                .introduction(foundation.getIntroduction())
                .corporateRegistrationNumber(foundation.getCorporateRegistrationNumber())
                .totalFundraisingAmount(foundation.getTotalFundraisingAmount())
                .executedAmount(foundation.getExecutedAmount())
                .phoneNumber(foundation.getPhoneNumber())
                .address(foundation.getAddress())
                .titleImageUrl(titleImageUrl)
                .imageUrls(imageUrls)
                .build();
    }

    @Transactional(readOnly = true)
    public FoundationDetail readByMemberId(long memberId) {
        Foundation foundation = foundationReader.readByMemberId(memberId);

        return read(foundation.getId());
    }
}
