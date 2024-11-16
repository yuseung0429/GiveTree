package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.donation.infrastructure.CampaignDonationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CampaignDonationInfoReader {

    private final CampaignDonationRepository campaignDonationRepository;

    public Slice<CampaignDonationFoundationInfo> readCampaignDonationFoundationInfoByUserId(
            long userId,
            Pageable pageable
    ) {
        return campaignDonationRepository.findCampaignDonationFoundationInfoByUserId(userId, pageable);
    }

    public Slice<CampaignDonationUserInfo> readCampaignDonationUserInfo(
            long userId,
            long campaignId,
            boolean own,
            Pageable pageable
    ) {
        return campaignDonationRepository.findCampaignDonationUserInfo(userId, campaignId, own, pageable);
    }

    public CampaignDonationStatisticInfo readCampaignDonationStatisticInfo(long campaignId) {
        return campaignDonationRepository.calculateCampaignDonationStatisticInfo(campaignId);
    }
}
