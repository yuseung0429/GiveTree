package com.dareuda.givetree.campaign.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@RequiredArgsConstructor
public class CampaignDetail {
    @NonNull
    private final Long id;

    @NonNull
    private final Long foundationId;

    @NonNull
    private final String name;

    @NonNull
    private final LocalDate startDate;

    @NonNull
    private final LocalDate endDate;

    @NonNull
    private final Long targetFundraisingAmount;

    @NonNull
    private final Long currentFundraisingAmount;

    private final String titleImageUrl;

    private final List<String> imageUrls;
}
