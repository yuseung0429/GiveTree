package com.dareuda.givetree.donation.infrastructure;

import com.dareuda.givetree.donation.domain.DonationSubscription;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface RegularDonationRepository extends Repository<DonationSubscription, Long> {
    DonationSubscription save(DonationSubscription donationSubscription);
    List<DonationSubscription> findAllByMemberId(long memberId);
}
