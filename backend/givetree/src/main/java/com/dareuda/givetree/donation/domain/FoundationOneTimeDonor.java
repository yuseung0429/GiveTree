package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.donation.domain.dto.DonateToFoundationCommand;
import com.dareuda.givetree.token.domain.FoundationDonationTokenTransferrer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoundationOneTimeDonor {
    private final FoundationDonationTokenTransferrer foundationDonationTokenTransferrer;

    public void donate(DonateToFoundationCommand command) {
        foundationDonationTokenTransferrer.transfer(
                command.getMemberId(),
                command.getFoundationId(),
                command.getAmount(),
                command.getSimplePassword(),
                command.getMessage()
        );
    }
}
