package com.dareuda.givetree.donation.infrastructure;

import com.dareuda.givetree.donation.domain.Donation;
import org.springframework.data.repository.Repository;

public interface DonationRepository extends Repository<Donation, Long> {
    Donation save(Donation donation);
}
