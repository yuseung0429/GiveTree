package com.dareuda.givetree.donation.controller.dto.response;

import com.dareuda.givetree.donation.domain.DonationMessage;
import com.dareuda.givetree.donation.domain.DonationTree;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class ReadDonationTreeResponse {

    private List<DonationMessage> messages;

    public static ReadDonationTreeResponse from(DonationTree donationTree) {
        return new ReadDonationTreeResponse(donationTree.getMessages());
    }
}
