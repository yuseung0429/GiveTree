package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.donation.controller.DonationErrorCode;
import com.dareuda.givetree.donation.infrastructure.FoundationDonateSubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoundationDonateSubscriptionReader {

    private final FoundationDonateSubscriptionRepository foundationDonateSubscriptionRepository;

    public boolean existsFoundationDonateSubscription(long memberId, long foundationId) {
        return foundationDonateSubscriptionRepository.existsByMemberIdAndFoundationId(memberId, foundationId);
    }

    public Slice<FoundationDonateSubscription> readByMemberIdFetchFoundation(long userId, Pageable pageable) {
        return foundationDonateSubscriptionRepository.findByMemberIdFetchFoundation(userId, pageable);
    }

    public FoundationDonateSubscription readByMemberIdAndFoundationId(long userId, long foundationId) {
        return foundationDonateSubscriptionRepository.findByMemberIdAndFoundationId(userId, foundationId)
                .orElseThrow(() -> new RestApiException(DonationErrorCode.FOUNDATION_DONATION_SUBSCRIPTION_NOT_FOUND));
    }

    public long countByMemberId(long memberId) {
        return foundationDonateSubscriptionRepository.countByMemberId(memberId);
    }

    public long countByFoundationId(long foundationId) {
        return foundationDonateSubscriptionRepository.countByFoundationId(foundationId);
    }
}
