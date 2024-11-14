package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.donation.infrastructure.FoundationDonateSubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoundationDonateSubscriptionRemover {

    private final FoundationDonateSubscriptionRepository foundationDonateSubscriptionRepository;
    private final FoundationDonateSubscriptionReader foundationDonateSubscriptionReader;

    public void remove(long userId, long foundationId) {
        FoundationDonateSubscription foundationDonateSubscription
                = foundationDonateSubscriptionReader.readByMemberIdAndFoundationId(userId, foundationId);
        foundationDonateSubscriptionRepository.delete(foundationDonateSubscription);
    }
}
