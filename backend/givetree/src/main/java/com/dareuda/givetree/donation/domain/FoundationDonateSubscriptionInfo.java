package com.dareuda.givetree.donation.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FoundationDonateSubscriptionInfo {
    private Long foundationId;
    private String image;
    private String foundationName;
    private Long amount;

    public static FoundationDonateSubscriptionInfo from(FoundationDonateSubscription subscription) {
        return FoundationDonateSubscriptionInfo.builder()
                .foundationId(subscription.getFoundation().getId())
                .image(subscription.getFoundation().getMember().getProfileImage().getUrl())
                .foundationName(subscription.getFoundation().getMember().getName())
                .amount(subscription.getAmount())
                .build();
    }
}
