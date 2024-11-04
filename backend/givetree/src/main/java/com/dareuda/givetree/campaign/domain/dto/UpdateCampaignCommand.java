package com.dareuda.givetree.campaign.domain.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Getter
@RequiredArgsConstructor
public class UpdateCampaignCommand {
    private final Long foundationId;
    private final String name;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String imageUrl;
    private final Long targetFundraisingAmount;
}
