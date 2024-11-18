package com.dareuda.givetree.donation.domain;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class DonationTree {

    private String foundationName;

    private long campaignId;

    private String campaignName;

    private long totalCount;

    private List<DonationMessage> messages;
}
