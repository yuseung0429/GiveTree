package com.dareuda.givetree.campaign.service;

import com.dareuda.givetree.campaign.domain.*;
import com.dareuda.givetree.campaign.domain.dto.CampaignDetail;
import com.dareuda.givetree.campaign.domain.dto.CampaignSearchFilter;
import com.dareuda.givetree.campaign.domain.dto.CreateCampaignCommand;
import com.dareuda.givetree.campaign.domain.dto.UpdateCampaignCommand;
import com.dareuda.givetree.wallet.domain.campaign.CampaignWalletCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CampaignService {
    private final CampaignCreator campaignCreator;
    private final CampaignUpdater campaignUpdater;
    private final CampaignDeleter campaignDeleter;
    private final CampaignDetailReader campaignDetailReader;
    private final CampaignAuthorityValidator campaignAuthorityValidator;
    private final CampaignSearcher campaignSearcher;
    private final CampaignCloser campaignCloser;
    private final CampaignWalletCreator campaignWalletCreator;
    private final CampaignContractCreator campaignContractCreator;

    public long createCampaign(long foundationId, CreateCampaignCommand command) {
        Campaign campaign = campaignCreator.create(foundationId, command);

        campaignWalletCreator.create(campaign.getId());

        // TODO: 종료일시를 언제로 지정할 것인가
        String contractAddress = campaignContractCreator.create(foundationId, campaign.getId(), campaign.getEndDate().atStartOfDay());

        campaignUpdater.update(campaign.getId(), UpdateCampaignCommand.builder().contractAddress(contractAddress).build());

        return campaign.getId();
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

    public Page<CampaignDetail> searchFoundationDetail(CampaignSearchFilter filter, Pageable pageable) {
        return campaignSearcher.searchFoundations(filter, pageable);
    }

    public void closeCampaign(long foundationId, long campaignId) {
        campaignAuthorityValidator.validateModifyAuthority(foundationId, campaignId);

        campaignCloser.close(foundationId, campaignId);
    }
}
