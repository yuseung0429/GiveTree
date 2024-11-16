package com.dareuda.givetree.donation.infrastructure;

import com.dareuda.givetree.donation.domain.CampaignDonationUserInfo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface CampaignDonationCustomRepository {
    Slice<CampaignDonationUserInfo> findCampaignDonationUserInfo(long userId, long campaignId, boolean own, Pageable pageable);
}
