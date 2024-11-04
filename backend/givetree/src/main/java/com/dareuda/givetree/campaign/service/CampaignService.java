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

    public long createCampaign(CreateCampaignCommand command) {
        return campaignCreator.create(command);
    }

    public void updateCampaign(long memberId, long campaignId, UpdateCampaignCommand command) {
        campaignAuthorityValidator.validateModifyAuthority(memberId, campaignId);

        campaignUpdater.update(campaignId, command);
    }

    public void deleteCampaign(long memberId, long campaignId) {
        campaignAuthorityValidator.validateModifyAuthority(memberId, campaignId);

        campaignDeleter.delete(campaignId);
    }

    public CampaignDetail getCampaignDetail(long campaignId) {
        return campaignDetailReader.read(campaignId);
    }
}
