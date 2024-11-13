package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.token.domain.FoundationDonationTokenTransferrer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoundationOneTimeDonor {
    private final FoundationDonationTokenTransferrer foundationDonationTokenTransferrer;

    public void donate(long memberId, long foundationId, long amount, String simplePassword) {
        foundationDonationTokenTransferrer.transfer(memberId, foundationId, amount, simplePassword, "");
    }
}
