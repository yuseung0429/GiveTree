package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.token.domain.FoundationDonationTokenTransferrer;
import com.dareuda.givetree.token.domain.TokenCharger;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoundationDonationTransferrer {

    private final TokenCharger tokenCharger;
    private final FoundationDonationTokenTransferrer foundationDonationTokenTransferrer;

    public void transfer(
            long userId,
            long foundationId,
            long amount,
            String message,
            FoundationDonationType donationType
    ) {
        tokenCharger.charge(userId, amount, message);
        foundationDonationTokenTransferrer.transfer(userId, foundationId, amount, donationType);
    }
}
