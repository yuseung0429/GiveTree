package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.token.domain.CampaignDonationTokenTransferrer;
import com.dareuda.givetree.token.domain.TokenCharger;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CampaignDonationTransferrer {

    private final TokenCharger tokenCharger;
    private final CampaignDonationTokenTransferrer campaignDonationTokenTransferrer;

    public void transfer(
            long userId,
            long campaignId,
            long amount,
            String message,
            String shareMessage
    ) {
        tokenCharger.charge(userId, amount, message);
        campaignDonationTokenTransferrer.transfer(userId, campaignId, amount, shareMessage);
    }
}
