package com.dareuda.givetree.donation.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FoundationDonateSubscriptionInfo {
    private Long foundationId;
    private String name;
    private Long amount;

    public static FoundationDonateSubscriptionInfo from(FoundationDonateSubscription subscription) {
        return FoundationDonateSubscriptionInfo.builder()
                .foundationId(subscription.getFoundation().getId())
                .name(subscription.getFoundation().getMember().getName())
                .amount(subscription.getAmount())
                .build();
    }
}
