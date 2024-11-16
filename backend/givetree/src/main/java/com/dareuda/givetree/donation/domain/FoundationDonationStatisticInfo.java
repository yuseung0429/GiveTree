package com.dareuda.givetree.donation.domain;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FoundationDonationStatisticInfo {
    private Long donationCount;
    private Long donationAmount;
    @Setter
    private Long regularSubscriptionCount;
}
