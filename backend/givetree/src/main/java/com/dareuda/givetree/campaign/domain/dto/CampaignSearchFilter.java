package com.dareuda.givetree.campaign.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class CampaignSearchFilter {
    private final String name;
    private final String introduction;
    private final String foundationName;
}
