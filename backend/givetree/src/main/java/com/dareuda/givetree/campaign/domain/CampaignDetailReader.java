package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.campaign.domain.dto.CampaignDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class CampaignDetailReader {
    private final CampaignReader campaignReader;

    @Transactional(readOnly = true)
    public CampaignDetail read(long memberId) {
        Campaign campaign = campaignReader.read(memberId);
        // TODO: image 도메인 기능 추가 후 수정
        // String imageUrl = campaign.getImage() != null ? campaign.getImage().getUrl() ? null;
        String imageUrl = null;

        return CampaignDetail.builder()
                .id(campaign.getId())
                .foundationId(campaign.getFoundation().getId())
                .name(campaign.getName())
                .startDate(campaign.getStartDate())
                .endDate(campaign.getEndDate())
                .imageUrl(imageUrl)
                .targetFundraisingAmount(campaign.getTargetFundraisingAmount())
                .currentFundraisingAmount(campaign.getCurrentFundraisingAmount())
                .build();
    }
}
