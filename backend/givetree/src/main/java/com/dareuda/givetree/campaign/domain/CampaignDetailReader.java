package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.campaign.domain.dto.CampaignDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CampaignDetailReader {
    private final CampaignReader campaignReader;

    @Transactional(readOnly = true)
    public CampaignDetail read(long memberId) {
        Campaign campaign = campaignReader.read(memberId);

        String titleImageUrl = campaign.getTitleImage() != null ? campaign.getTitleImage().getUrl() : null;
        List<String> imageUrls = new ArrayList<>();
        campaign.getImages().forEach(image -> imageUrls.add(image.getImage().getUrl()));

        return CampaignDetail.builder()
                .id(campaign.getId())
                .foundationId(campaign.getFoundation().getId())
                .name(campaign.getName())
                .startDate(campaign.getStartDate())
                .endDate(campaign.getEndDate())
                .titleImageUrl(titleImageUrl)
                .imageUrls(imageUrls)
                .targetFundraisingAmount(campaign.getTargetFundraisingAmount())
                .currentFundraisingAmount(campaign.getCurrentFundraisingAmount())
                .build();
    }
}
