package com.dareuda.givetree.foundation.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@Builder
@RequiredArgsConstructor
public class FoundationDetail {
    @NonNull
    private final Long id;

    @NonNull
    private final Long ownerId;

    @NonNull
    private final String introduction;

    @NonNull
    private final String corporateRegistrationNumber;

    @NonNull
    private final Long totalFundraisingAmount;

    @NonNull
    private final Long executedAmount;

    @NonNull
    private final String phoneNumber;

    @NonNull
    private final String address;

    private final String titleImageUrl;

    private final List<String> imageUrls;
}
