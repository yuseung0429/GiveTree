package com.dareuda.givetree.campaign.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class UpdateCampaignCommand {
    private final String name;
    private final String introduction;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String titleImageUrl;
    private final List<String> newImageUrls;
    private final List<Integer> deleteImageOrders;
    private final Long targetFundraisingAmount;
    private final String contractAddress;
}
