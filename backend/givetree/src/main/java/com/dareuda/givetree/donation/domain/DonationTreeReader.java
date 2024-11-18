package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.campaign.domain.Campaign;
import com.dareuda.givetree.campaign.domain.CampaignReader;
import com.dareuda.givetree.donation.infrastructure.CampaignDonationRepository;
import com.dareuda.givetree.donation.infrastructure.DonationCustomRepository;
import com.dareuda.givetree.member.domain.MemberReader;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class DonationTreeReader {

    private static final int DEFAULT_PAGE_SIZE = 10;

    private final CampaignReader campaignReader;
    private final MemberReader memberReader;
    private final CampaignDonationRepository campaignDonationRepository;

    public DonationTree read(long campaignId, Pageable pageable) {
        Campaign campaign = campaignReader.read(campaignId);

        long foundationId = campaign.getFoundation().getId();
        String foundationName = memberReader.read(foundationId).getName();

        long totalCount = campaignDonationRepository.countByCampaign(campaign);
        List<DonationMessage> messages = campaignDonationRepository.findDonationMessagesByCampaignId(campaignId, pageable);

        return DonationTree.builder()
                .foundationName(foundationName)
                .campaignId(campaignId)
                .campaignName(campaign.getName())
                .totalCount(totalCount)
                .messages(messages)
                .build();
    }

    public DonationTree readFirstTree(long memberId, Long currentCampaignId) {
        long nextCampaignId = getNextCampaignId(memberId, currentCampaignId);
        return read(nextCampaignId, PageRequest.ofSize(DEFAULT_PAGE_SIZE));
    }

    private long getNextCampaignId(long memberId, Long currentCampaignId) {
        List<Campaign> donatedCampaigns = campaignReader.readDonatedCampaigns(memberId);

        boolean hasDonationHistory = !donatedCampaigns.isEmpty();
        boolean isInMessageView = currentCampaignId != null;

        if (hasDonationHistory) {
            if (!isInMessageView) {
                return donatedCampaigns.get(0).getId();
            } else {
                for (Campaign donatedCampaign : donatedCampaigns) {
                    if (donatedCampaign.getId() > currentCampaignId) {
                        return donatedCampaign.getId();
                    }
                }
            }
        }

        List<Campaign> campaigns = campaignReader.readAll();
        int index = (int)(Math.random() * campaigns.size());
        long nextCampaignId = campaigns.get(index).getId();

        if (!isInMessageView) {
            return nextCampaignId;
        }

        while (nextCampaignId == currentCampaignId) {
            index = (int)(Math.random() * campaigns.size());
            nextCampaignId = campaigns.get(index).getId();
        }
        return nextCampaignId;
    }
}
