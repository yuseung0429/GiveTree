package com.dareuda.givetree.donation.controller.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FoundationRegularDonateRequest {
    private final Long amount;
    private final String simplePassword;
}
