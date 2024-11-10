package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.campaign.domain.dto.CampaignDetail;
import com.dareuda.givetree.media.domain.Media;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CampaignDetailReader {
    private final CampaignReader campaignReader;

    @Transactional(readOnly = true)
    public CampaignDetail read(long memberId) {
        Campaign campaign = campaignReader.read(memberId);

        String titleImageUrl = campaign.getTitleImage() != null ? campaign.getTitleImage().getUrl() : null;
        List<String> imageUrls = campaign.getImages().stream().map(CampaignImage::getImage).map(Media::getUrl).toList();

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
