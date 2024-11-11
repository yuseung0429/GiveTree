package com.dareuda.givetree.campaign.controller.dto.request;

import com.dareuda.givetree.campaign.domain.dto.UpdateCampaignCommand;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@RequiredArgsConstructor
public class UpdateCampaignRequest {
    private final String name;
    private final String introduction;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String titleImageUrl;
    private final List<String> newImageUrls;
    private final List<Integer> deleteImageOrders;
    private final Long targetFundraisingAmount;

    public UpdateCampaignCommand convertToCommand() {
        return UpdateCampaignCommand.builder()
                .name(name)
                .introduction(introduction)
                .startDate(startDate)
                .endDate(endDate)
                .titleImageUrl(titleImageUrl)
                .newImageUrls(newImageUrls)
                .deleteImageOrders(deleteImageOrders)
                .targetFundraisingAmount(targetFundraisingAmount)
                .build();
    }
}
