package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.campaign.domain.dto.UpdateCampaignCommand;
import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.foundation.domain.FoundationReader;
import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.media.domain.ImageAppender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class CampaignUpdater {
    private final CampaignReader campaignReader;
    private final ImageAppender imageAppender;
    private final FoundationReader foundationReader;

    @Transactional
    public void update(long campaignId, UpdateCampaignCommand command) {
        Campaign campaign = campaignReader.read(campaignId);

        if (command.getFoundationId() != null) {
            Foundation foundation = foundationReader.read(command.getFoundationId());
            campaign.updateFoundation(foundation);
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
        if (command.getTitleImageUrl() != null) {
            Image image = imageAppender.append(command.getTitleImageUrl());
            campaign.updateTitleImage(image);
        }
        if (command.getNewImageUrls() != null) {
            command.getNewImageUrls().forEach(newImageUrl -> campaign.addImage(imageAppender.append(newImageUrl)));
        }
        if (command.getDeleteImageIds() != null) {
            command.getDeleteImageIds().forEach(campaign::deleteImage);
        }
        if (command.getTargetFundraisingAmount() != null) {
            campaign.updateTargetFundraisingAmount(command.getTargetFundraisingAmount());
        }
    }
}
