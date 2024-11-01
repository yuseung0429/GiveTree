package com.dareuda.givetree.campaign.domain;


import com.dareuda.givetree.campaign.controller.CampaignErrorCode;
import com.dareuda.givetree.campaign.infrastructure.CampaignRepository;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class CampaignReader {
    private final CampaignRepository campaignRepository;

    @Transactional(readOnly = true)
    public Campaign read(long campaignId) {
        return campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RestApiException(CampaignErrorCode.CAMPAIGN_NOT_FOUND));
    }
}
