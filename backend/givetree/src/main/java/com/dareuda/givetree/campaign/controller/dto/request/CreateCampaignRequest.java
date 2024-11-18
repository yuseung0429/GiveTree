package com.dareuda.givetree.campaign.controller.dto.request;

import com.dareuda.givetree.campaign.domain.dto.CreateCampaignCommand;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@RequiredArgsConstructor
public class CreateCampaignRequest {
    @NotBlank
    private final String name;

    @NotBlank
    private final String introduction;

    @NotNull
    private final LocalDate startDate;

    @NotNull
    private final LocalDate endDate;

    private final String titleImageUrl;

    private final List<String> imageUrls = new ArrayList<>();

    @NotNull
    private final long targetFundraisingAmount;

    public CreateCampaignCommand convertToCommand() {
        return CreateCampaignCommand.builder()
                .name(name)
                .introduction(introduction)
                .startDate(startDate)
                .endDate(endDate)
                .titleImageUrl(titleImageUrl)
                .imageUrls(imageUrls)
                .targetFundraisingAmount(targetFundraisingAmount)
                .build();
    }
}
