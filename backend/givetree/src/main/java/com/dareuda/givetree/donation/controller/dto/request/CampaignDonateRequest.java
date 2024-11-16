package com.dareuda.givetree.donation.controller.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CampaignDonateRequest {
    private final Long amount;
    private final String message;
    private final String simplePassword;
}
