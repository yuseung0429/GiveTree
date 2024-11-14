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
    private final CampaignTotalAmountLoader campaignTotalAmountLoader;

    @Transactional(readOnly = true)
    public CampaignDetail read(Campaign campaign) {
        String titleImageUrl = campaign.getTitleImage() != null ? campaign.getTitleImage().getUrl() : null;
        List<String> imageUrls = campaign.getImages().stream().map(CampaignImage::getImage).map(Media::getUrl).toList();
        long currentAmount = campaignTotalAmountLoader.load(campaign.getId());

        return CampaignDetail.builder()
                .id(campaign.getId())
                .foundationId(campaign.getFoundation().getId())
                .foundationName(campaign.getFoundation().getMember().getName())
                .name(campaign.getName())
                .introduction(campaign.getIntroduction())
                .startDate(campaign.getStartDate())
                .endDate(campaign.getEndDate())
                .titleImageUrl(titleImageUrl)
                .imageUrls(imageUrls)
                .targetFundraisingAmount(campaign.getTargetFundraisingAmount())
                .currentFundraisingAmount(currentAmount)
                .build();
    }

    @Transactional(readOnly = true)
    public CampaignDetail read(long campaignId) {
        return read(campaignReader.read(campaignId));
    }
}
