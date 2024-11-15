package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.donation.infrastructure.FoundationDonationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoundationDonationInfoReader {

    private final FoundationDonationRepository foundationDonationRepository;

    public Slice<FoundationDonationInfo> readByMemberId(long memberId, Pageable pageable) {
       return foundationDonationRepository.findFoundationDonationInfoByMemberId(memberId, pageable);
    }
}
