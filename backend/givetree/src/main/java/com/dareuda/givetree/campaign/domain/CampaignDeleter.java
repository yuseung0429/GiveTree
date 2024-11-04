package com.dareuda.givetree.campaign.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class CampaignDeleter {
    private final CampaignReader campaignReader;

    @Transactional
    public void delete(long campaignId) {
        Campaign campaign = campaignReader.read(campaignId);
        campaign.delete();
    }
}
