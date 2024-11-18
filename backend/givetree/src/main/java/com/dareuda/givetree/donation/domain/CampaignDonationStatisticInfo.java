package com.dareuda.givetree.donation.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CampaignDonationStatisticInfo {
    private Long donationCount;
    private Long donationAmount;
    @Setter
    private Long goalAmount;
}
