package com.dareuda.givetree.donation.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DonationStatisticInfo {
    private Long donationAmount;
    private Long donationCount;
    private Long foundationDonationAmount;
    private Long foundationDonationCount;
    private Long foundationDonationRegularAmount;
    private Long foundationDonationRegularCount;
    private Long campaignDonationAmount;
    private Long campaignDonationCount;
    @Setter
    private Long foundationDonationRegularSubscriptionCount;
}
