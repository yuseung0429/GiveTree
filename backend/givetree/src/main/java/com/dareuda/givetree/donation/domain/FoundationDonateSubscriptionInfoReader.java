package com.dareuda.givetree.donation.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoundationDonateSubscriptionInfoReader {

    private final FoundationDonateSubscriptionReader foundationDonateSubscriptionReader;

    public Slice<FoundationDonateSubscriptionInfo> readByMemberIdFetchFoundation(long userId, Pageable pageable) {
        Slice<FoundationDonateSubscription> foundationDonateSubscriptions
                = foundationDonateSubscriptionReader.readByMemberIdFetchFoundation(userId, pageable);
        return foundationDonateSubscriptions.map(FoundationDonateSubscriptionInfo::from);
    }
}
