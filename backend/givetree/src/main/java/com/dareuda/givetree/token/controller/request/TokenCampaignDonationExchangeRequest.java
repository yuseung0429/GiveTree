package com.dareuda.givetree.token.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TokenCampaignDonationExchangeRequest {
    private List<Long> transactionIds;
    private String simplePassword;
}
