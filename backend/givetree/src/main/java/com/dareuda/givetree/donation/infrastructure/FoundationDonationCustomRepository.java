package com.dareuda.givetree.donation.infrastructure;

import com.dareuda.givetree.donation.domain.FoundationDonationStatisticInfo;
import com.dareuda.givetree.donation.domain.FoundationDonationUserInfo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.time.LocalDate;

public interface FoundationDonationCustomRepository {
    Slice<FoundationDonationUserInfo> findFoundationDonationUserInfo(long userId, long foundationId, boolean own, LocalDate startDate, LocalDate endDate, Pageable pageable);

    long calculateFoundationDonationAmount(long userId, long foundationId, boolean own);

    FoundationDonationStatisticInfo calculateFoundationDonationStatisticInfo(long foundationId, LocalDate startDate, LocalDate endDate);
}
