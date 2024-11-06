package com.dareuda.givetree.campaign.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@RequiredArgsConstructor
public class CampaignDetail {
    private final long id;

    private final long foundationId;

    @NonNull
    private final String name;

    @NonNull
    private final LocalDate startDate;

    @NonNull
    private final LocalDate endDate;

    private final String imageUrl;

    private final long targetFundraisingAmount;

    private final long currentFundraisingAmount;

}
