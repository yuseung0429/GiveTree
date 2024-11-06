package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.campaign.domain.dto.CreateCampaignCommand;
import com.dareuda.givetree.campaign.infrastructure.CampaignRepository;
import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.foundation.domain.FoundationReader;
import com.dareuda.givetree.media.domain.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class CampaignCreator {
    private final CampaignRepository campaignRepository;
    private final FoundationReader foundationReader;

    @Transactional
    public long create(CreateCampaignCommand command) {
        Foundation foundation = foundationReader.read(command.getFoundationId());

        // TODO: 이미지 읽기 추가되면 변경
        //Image image = command.getProfileImageId() != null ? imageReader.read(command.getProfileImageId()) : null;
        Image image = null;

        Campaign campaign = campaignRepository.save(
                Campaign.createCampaign(
                        foundation,
                        command.getName(),
                        command.getStartDate(),
                        command.getEndDate(),
                        image,
                        command.getTargetFundraisingAmount()
                )
        );

        return campaign.getId();
    }
}
