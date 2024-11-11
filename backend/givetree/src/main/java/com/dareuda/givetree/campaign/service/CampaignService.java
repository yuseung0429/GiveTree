package com.dareuda.givetree.campaign.service;

import com.dareuda.givetree.campaign.domain.*;
import com.dareuda.givetree.campaign.domain.dto.CampaignDetail;
import com.dareuda.givetree.campaign.domain.dto.CreateCampaignCommand;
import com.dareuda.givetree.campaign.domain.dto.UpdateCampaignCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CampaignService {
    private final CampaignCreator campaignCreator;
    private final CampaignUpdater campaignUpdater;
    private final CampaignDeleter campaignDeleter;
    private final CampaignDetailReader campaignDetailReader;
    private final CampaignAuthorityValidator campaignAuthorityValidator;

    public long createCampaign(long foundationId, CreateCampaignCommand command) {
        return campaignCreator.create(foundationId, command);
    }

    public void updateCampaign(long foundationId, long campaignId, UpdateCampaignCommand command) {
        campaignAuthorityValidator.validateModifyAuthority(foundationId, campaignId);

        campaignUpdater.update(campaignId, command);
    }

    public void deleteCampaign(long foundationId, long campaignId) {
        campaignAuthorityValidator.validateModifyAuthority(foundationId, campaignId);

        campaignDeleter.delete(campaignId);
    }

    public CampaignDetail getCampaignDetail(long campaignId) {
        return campaignDetailReader.read(campaignId);
    }
}
