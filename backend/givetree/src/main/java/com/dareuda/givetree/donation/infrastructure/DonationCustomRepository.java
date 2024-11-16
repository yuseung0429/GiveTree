package com.dareuda.givetree.donation.infrastructure;

import java.time.LocalDate;

public interface DonationCustomRepository {

    long calculateDonationAmountByMemberIdForPeriod(long memberId, LocalDate startDate, LocalDate endDate);
}
