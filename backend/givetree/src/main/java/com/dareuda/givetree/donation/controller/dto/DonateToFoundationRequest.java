package com.dareuda.givetree.donation.controller.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class DonateToFoundationRequest {
    @Min(0)
    private final long amount;
    @NotNull
    private final String simplePassword;
}
