package com.dareuda.givetree.donation.service;

import com.dareuda.givetree.donation.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DonationService {
    private final CampaignDonor campaignDonor;
    private final FoundationDonor foundationDonor;
    private final FoundationDonateSubscriptionRegistrar foundationDonateSubscriptionRegistrar;
    private final FoundationDonateSubscriptionInfoReader foundationDonateSubscriptionInfoReader;
    private final FoundationDonateSubscriptionRemover foundationDonateSubscriptionRemover;

    public void donateFoundation(long userId, long foundationId, long amount, String simplePassword) {
        foundationDonor.donate(userId, foundationId, amount, simplePassword);
    }

    public void registerFoundationDonateSubscription(long userId, long foundationId, long amount, String simplePassword) {
        foundationDonateSubscriptionRegistrar.register(userId, foundationId, amount, simplePassword);
    }

    public void donateCampaign(long userId, long campaignId, long amount, String message, String simplePassword) {
        campaignDonor.donate(userId, campaignId, amount, message, simplePassword);
    }

    public Slice<FoundationDonateSubscriptionInfo> readFoundationDonationRegular(long userId, Pageable pageable) {
        return foundationDonateSubscriptionInfoReader.readByMemberIdFetchFoundation(userId, pageable);
    }

    public void removeFoundationDonateSubscription(long userid, long foundationId) {
        foundationDonateSubscriptionRemover.remove(userid, foundationId);
    }
}