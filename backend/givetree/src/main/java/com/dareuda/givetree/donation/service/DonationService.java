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
    private final FoundationDonationInfoReader foundationDonationInfoReader;
    private final FoundationDonateSubscriptionRegistrar foundationDonateSubscriptionRegistrar;
    private final FoundationDonateSubscriptionInfoReader foundationDonateSubscriptionInfoReader;
    private final FoundationDonateSubscriptionRemover foundationDonateSubscriptionRemover;
    private final CampaignDonationInfoReader campaignDonationInfoReader;
    private final DonationTreeReader donationTreeReader;

    public Slice<FoundationDonationInfo> readFoundationDonation(long userId, Pageable pageable) {
        return foundationDonationInfoReader.readByMemberId(userId, pageable);
    }

    public Slice<CampaignDonationInfo> readCampaignDonation(long userId, Pageable pageable) {
        return campaignDonationInfoReader.readByMemberId(userId, pageable);
    }

    public void donateFoundation(long userId, long foundationId, long amount, String simplePassword) {
        foundationDonor.donateOneTime(userId, foundationId, amount, simplePassword);
    }

    public void donateCampaign(long userId, long campaignId, long amount, String message, String simplePassword) {
        campaignDonor.donate(userId, campaignId, amount, message, simplePassword);
    }

    public Slice<FoundationDonateSubscriptionInfo> readFoundationDonationRegular(long userId, Pageable pageable) {
        return foundationDonateSubscriptionInfoReader.readByMemberIdFetchFoundation(userId, pageable);
    }

    public void registerFoundationDonateSubscription(long userId, long foundationId, long amount, String simplePassword) {
        foundationDonateSubscriptionRegistrar.register(userId, foundationId, amount, simplePassword);
    }

    public void removeFoundationDonateSubscription(long userid, long foundationId) {
        foundationDonateSubscriptionRemover.remove(userid, foundationId);
    }

    public DonationTree readFirstDonationTree(long memberId, Long campaignId) {
        return donationTreeReader.readFirstTree(memberId, campaignId);
    }

    public DonationTree readDonationTree(long campaignId, Pageable pageable) {
        return donationTreeReader.read(campaignId, pageable);
    }
}
