package com.dareuda.givetree.donation.infrastructure;

import com.dareuda.givetree.donation.domain.Donation;
import org.springframework.data.repository.Repository;

public interface BaseDonationRepository<T extends Donation> extends Repository<T, Long> {
    T save(T donation);
}