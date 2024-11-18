package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.donation.infrastructure.FoundationDonateSubscriptionRepository;
import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.foundation.domain.FoundationReader;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoundationDonateSubscriptionRegistrar {

    private final FoundationDonateSubscriptionRepository subscriptionRepository;
    private final MemberReader memberReader;
    private final FoundationReader foundationReader;
    private final FoundationDonateSubscriptionValidator foundationDonateSubscriptionValidator;

    public void register(long userId, long foundationId, long amount, String simplePassword) {
        foundationDonateSubscriptionValidator.validateRegisterable(userId, foundationId, simplePassword);

        Member user = memberReader.read(userId);
        Foundation foundation = foundationReader.read(foundationId);

        subscriptionRepository.save(FoundationDonateSubscription.builder()
                .member(user)
                .foundation(foundation)
                .amount(amount)
                .build()
        );
    }
}
