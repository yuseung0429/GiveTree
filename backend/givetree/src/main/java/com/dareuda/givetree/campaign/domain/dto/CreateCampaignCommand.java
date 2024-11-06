package com.dareuda.givetree.campaign.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Getter
@RequiredArgsConstructor
public class CreateCampaignCommand {
    private final long foundationId;
    private final String name;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String imageUrl;
    private final long targetFundraisingAmount;
}
