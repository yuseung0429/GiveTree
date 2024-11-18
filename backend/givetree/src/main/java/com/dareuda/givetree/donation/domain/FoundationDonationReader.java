package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.donation.infrastructure.FoundationDonationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoundationDonationReader {

    private final FoundationDonationRepository foundationDonationRepository;

    public long readFoundationDonationAmount(long userId, long foundationId, Boolean own) {
        return foundationDonationRepository.calculateFoundationDonationAmount(userId, foundationId, own);
    }
}
