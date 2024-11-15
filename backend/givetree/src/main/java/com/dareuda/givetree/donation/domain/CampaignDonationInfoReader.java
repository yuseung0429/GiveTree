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

    public Slice<CampaignDonationInfo> readByMemberId(long memberId, Pageable pageable) {
        return campaignDonationRepository.findCampaignDonationInfoByMemberId(memberId, pageable);
    }
}
