package com.dareuda.givetree.donation.controller.dto.response;

import com.dareuda.givetree.donation.domain.DonationMessage;
import com.dareuda.givetree.donation.domain.DonationTree;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ReadFirstDonationTreeResponse {

    private String foundationName;

    private long campaignId;

    private String campaignName;

    private long totalCount;

    private List<DonationMessage> messages;

    public static ReadFirstDonationTreeResponse from(DonationTree donationTree) {
        return ReadFirstDonationTreeResponse.builder()
                .foundationName(donationTree.getFoundationName())
                .campaignId(donationTree.getCampaignId())
                .campaignName(donationTree.getCampaignName())
                .totalCount(donationTree.getTotalCount())
                .messages(donationTree.getMessages())
                .build();
    }
}
