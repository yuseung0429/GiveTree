package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.campaign.controller.CampaignErrorCode;
import com.dareuda.givetree.campaign.infrastructure.CampaignQueryRepository;
import com.dareuda.givetree.campaign.infrastructure.CampaignRepository;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CampaignReader {
    private final CampaignRepository campaignRepository;
    private final CampaignQueryRepository campaignQueryRepository;

    @Transactional(readOnly = true)
    public Campaign read(long campaignId) {
        return campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RestApiException(CampaignErrorCode.CAMPAIGN_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Campaign readReference(long campaignId) {
        return campaignRepository.getReferenceById(campaignId)
                .orElseThrow(() -> new RestApiException(CampaignErrorCode.CAMPAIGN_NOT_FOUND));
    }

    public List<Campaign> readAll() {
        return campaignRepository.findAll();
    }

    public List<Campaign> readDonatedCampaigns(long donorId) {
        return campaignQueryRepository.findDonatedCampaignsByMemberId(donorId);
    }
}
