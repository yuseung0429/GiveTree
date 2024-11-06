package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.campaign.domain.dto.UpdateCampaignCommand;
import com.dareuda.givetree.media.domain.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class CampaignUpdater {
    private final CampaignReader campaignReader;

    @Transactional
    public void update(long campaignId, UpdateCampaignCommand command) {
        Campaign campaign = campaignReader.read(campaignId);

        if (command.getFoundationId() != null) {
            // TODO: 재단 읽기 추가되면 변경
            // Foundation foundation = null;
            // campaign.updateFoundation(foundation);
        }
        if (command.getName() != null) {
            campaign.updateName(command.getName());
        }
        if (command.getStartDate() != null) {
            campaign.updateStartDate(command.getStartDate());
        }
        if (command.getEndDate() != null) {
            campaign.updateEndDate(command.getEndDate());
        }
        if (command.getImageUrl() != null) {
            // TODO: Image Repository로부터 찾아오기
            //Image image = command.getProfileImageId() != -1 ? MediaReader.read(command.getProfileImageId()) : null;
            Image image = null;
            campaign.updateImage(image);
        }
        if (command.getTargetFundraisingAmount() != null) {
            campaign.updateTargetFundraisingAmount(command.getTargetFundraisingAmount());
        }
    }
}
