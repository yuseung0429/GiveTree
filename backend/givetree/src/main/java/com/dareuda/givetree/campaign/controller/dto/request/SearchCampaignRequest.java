package com.dareuda.givetree.campaign.controller.dto.request;

import com.dareuda.givetree.campaign.domain.dto.CampaignSearchFilter;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SearchCampaignRequest {
    private final String name;
    private final String introduction;
    private final String foundationName;

    public CampaignSearchFilter convertToSearchFilter() {
        return CampaignSearchFilter.builder()
                .name(name)
                .introduction(introduction)
                .foundationName(foundationName)
                .build();
    }
}
