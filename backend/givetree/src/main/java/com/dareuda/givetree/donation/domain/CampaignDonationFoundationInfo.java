package com.dareuda.givetree.donation.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
public class CampaignDonationFoundationInfo {
    private final Long foundationId;
    private final String foundationImage;
    private final String foundationName;
    private final Long campaignId;
    private final String campaignName;
    private final Long amount;
    private final String message;
    private final LocalDateTime createdAt;
}