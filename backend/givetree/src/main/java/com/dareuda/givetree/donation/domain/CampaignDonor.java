package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.campaign.domain.Campaign;
import com.dareuda.givetree.campaign.domain.CampaignReader;
import com.dareuda.givetree.token.domain.CampaignDonationTokenTransferrer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CampaignDonor {
    private final static String MESSAGE = "%s 캠페인 후원";

    private final CampaignReader campaignReader;
    private final CampaignDonationAppender campaignDonationAppender;
    private final CampaignDonationTokenTransferrer campaignDonationTokenTransferrer;

    public void donate(long userId, long campaignId, long amount, String shareMessage, String simplePassword) {
        Campaign campaign = campaignReader.read(campaignId);
        String message = String.format(MESSAGE, campaign.getName());
        long transactionId = campaignDonationTokenTransferrer.transfer(
                userId,
                campaignId,
                amount,
                simplePassword,
                message
        );
        campaignDonationAppender.append(userId, campaignId, amount, transactionId, shareMessage);
    }
}