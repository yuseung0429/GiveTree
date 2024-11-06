package com.dareuda.givetree.campaign.controller.dto.request;

import com.dareuda.givetree.campaign.domain.dto.UpdateCampaignCommand;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Getter
@RequiredArgsConstructor
public class UpdateCampaignRequest {
    private final Long foundationId;

    private final String name;

    private final LocalDate startDate;

    private final LocalDate endDate;

    private final String imageUrl;

    private final Long targetFundraisingAmount;

    public UpdateCampaignCommand convertToCommand() {
        return new UpdateCampaignCommand(foundationId, name, startDate, endDate, imageUrl, targetFundraisingAmount);
    }
}
