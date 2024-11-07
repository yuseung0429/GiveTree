package com.dareuda.givetree.campaign.controller.dto.request;

import com.dareuda.givetree.campaign.domain.dto.UpdateCampaignCommand;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@RequiredArgsConstructor
public class UpdateCampaignRequest {
    private final Long foundationId;
    private final String name;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String titleImageUrl;
    private final List<String> newImageUrls;
    private final List<UUID> deleteImageIds;
    private final Long targetFundraisingAmount;

    public UpdateCampaignCommand convertToCommand() {
        return UpdateCampaignCommand.builder()
                .foundationId(foundationId)
                .name(name)
                .startDate(startDate)
                .endDate(endDate)
                .titleImageUrl(titleImageUrl)
                .newImageUrls(newImageUrls)
                .deleteImageIds(deleteImageIds)
                .targetFundraisingAmount(targetFundraisingAmount)
                .build();
    }
}
