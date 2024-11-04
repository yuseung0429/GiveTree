package com.dareuda.givetree.campaign.controller.dto.request;

import com.dareuda.givetree.campaign.domain.dto.CreateCampaignCommand;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Getter
@RequiredArgsConstructor
public class CreateCampaignRequest {
    @NotNull
    private final long foundationId;

    @NotBlank
    private final String name;

    @NotNull
    private final LocalDate startDate;

    @NotNull
    private final LocalDate endDate;

    private final String imageUrl;

    @NotNull
    private final long targetFundraisingAmount;

    public CreateCampaignCommand convertToCommand() {
        return new CreateCampaignCommand(foundationId, name, startDate, endDate, imageUrl, targetFundraisingAmount);
    }
}
