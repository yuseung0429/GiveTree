package com.dareuda.givetree.donation.service;

import com.dareuda.givetree.donation.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

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
    private final DonationReader donationReader;
    private final FoundationDonationReader foundationDonationReader;

    public Slice<FoundationDonationFoundationInfo> readFoundationDonationFoundationInfo(long userId, Pageable pageable) {
        return foundationDonationInfoReader.readFoundationDonationFoundationByUserId(userId, pageable);
    }

    public Slice<FoundationDonationUserInfo> readFoundationDonationUserInfo(long userId, long foundationId, boolean own, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        return foundationDonationInfoReader.readFoundationDonationUserInfo(userId, foundationId, own, startDate, endDate, pageable);
    }
    private final DonationTreeReader donationTreeReader;

    public Slice<CampaignDonationFoundationInfo> readCampaignDonationFoundationInfo(long userId, Pageable pageable) {
        return campaignDonationInfoReader.readCampaignDonationFoundationInfoByUserId(userId, pageable);
    }

    public Slice<CampaignDonationUserInfo> readCampaignDonationUserInfo(long userId, long campaignId, boolean own, Pageable pageable) {
        return campaignDonationInfoReader.readCampaignDonationUserInfo(userId, campaignId, own, pageable);
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

    public long readAmount(long userId, LocalDate startDate, LocalDate endDate) {
        return donationReader.readAmountByMemberIdForPeriod(userId, startDate, endDate);
    }

    public DonationStatisticInfo readStatistic(long memberId) {
        return donationReader.calculateDonationStatisticByMemberId(memberId);
    }

    public long readFoundationDonationAmount(long userId, long foundationId, Boolean own) {
        return foundationDonationReader.readFoundationDonationAmount(userId, foundationId, own);
    }

    public FoundationDonationStatisticInfo readFoundationDonationStatisticInfo(long foundationId, LocalDate startDate, LocalDate endDate) {
        return foundationDonationInfoReader.readFoundationDonationStatisticInfo(foundationId, startDate, endDate);
    }

    public CampaignDonationStatisticInfo readCampaignDonationStatisticInfo(long campaignId) {
        return campaignDonationInfoReader.readCampaignDonationStatisticInfo(campaignId);
    }

    public Slice<DonationFoundationNameInfo> readDonationFoundationNameInfo(long userId, Pageable pageable) {
        return foundationDonationInfoReader.readDonationFoundationNameInfo(userId, pageable);
    }
}
