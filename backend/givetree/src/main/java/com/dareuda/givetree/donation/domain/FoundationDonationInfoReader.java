package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.donation.infrastructure.FoundationDonationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FoundationDonationInfoReader {

    private final FoundationDonateSubscriptionReader foundationDonateSubscriptionReader;
    private final FoundationDonationRepository foundationDonationRepository;

    public Slice<FoundationDonationFoundationInfo> readFoundationDonationFoundationByUserId(
            long userId,
            Pageable pageable
    ) {
       return foundationDonationRepository.findFoundationDonationFoundationInfoByUserId(userId, pageable);
    }

    public Slice<FoundationDonationUserInfo> readFoundationDonationUserInfo(long userId, long foundationId, boolean own, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        return foundationDonationRepository.findFoundationDonationUserInfo(userId, foundationId, own, startDate, endDate, pageable);
    }

    public FoundationDonationStatisticInfo readFoundationDonationStatisticInfo(long foundationId, LocalDate startDate, LocalDate endDate) {
        FoundationDonationStatisticInfo info = foundationDonationRepository.calculateFoundationDonationStatisticInfo(foundationId, startDate, endDate);
        info.setRegularSubscriptionCount(foundationDonateSubscriptionReader.countByFoundationId(foundationId));
        return info;
    }

    public List<DonationFoundationNameInfo> readDonationFoundationNameInfo(long userId) {
        return foundationDonationRepository.findDonationFoundationNameInfoByUserId(userId);
    }

}
