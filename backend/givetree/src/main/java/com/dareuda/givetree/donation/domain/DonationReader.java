package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.donation.infrastructure.DonationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DonationReader {

    private final DonationRepository donationRepository;
    private final FoundationDonateSubscriptionReader foundationDonateSubscriptionReader;

    public long readAmountByMemberIdForPeriod(long userId, LocalDate startDate, LocalDate endDate) {
        return donationRepository.calculateDonationAmountByMemberIdForPeriod(userId, startDate, endDate);
    }

    public DonationStatisticInfo calculateDonationStatisticByMemberId(long memberId) {
        DonationStatisticInfo info = donationRepository.calculateDonationStatisticByMemberId(memberId);
        long foundationDonationRegularSubscriptionCount = foundationDonateSubscriptionReader.countByMemberId(memberId);
        info.setFoundationDonationRegularSubscriptionCount(foundationDonationRegularSubscriptionCount);
        return info;
    }
}
