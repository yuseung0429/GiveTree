package com.dareuda.givetree.donation.infrastructure;

import com.dareuda.givetree.donation.domain.CampaignDonationUserInfo;
import com.dareuda.givetree.donation.domain.DonationMessage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface CampaignDonationCustomRepository {
    Slice<CampaignDonationUserInfo> findCampaignDonationUserInfo(long userId, long campaignId, boolean own, Pageable pageable);
    List<DonationMessage> findDonationMessagesByCampaignId(long campaignId, Pageable pageable);
}
