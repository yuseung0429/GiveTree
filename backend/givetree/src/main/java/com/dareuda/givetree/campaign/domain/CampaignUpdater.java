package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.campaign.domain.dto.UpdateCampaignCommand;
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

    @Transactional
    public void update(long campaignId, UpdateCampaignCommand command) {
        Campaign campaign = campaignReader.read(campaignId);

        if (command.getName() != null) {
            campaign.updateName(command.getName());
        }
        if (command.getIntroduction() != null) {
            campaign.updateIntroduction(command.getIntroduction());
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
        if (command.getDeleteImageOrders() != null) {
            campaign.deleteImages(command.getDeleteImageOrders());
        }
        if (command.getNewImageUrls() != null) {
            command.getNewImageUrls().forEach(newImageUrl -> campaign.addImage(imageAppender.append(newImageUrl)));
        }
        if (command.getTargetFundraisingAmount() != null) {
            campaign.updateTargetFundraisingAmount(command.getTargetFundraisingAmount());
        }
        if (command.getContractAddress() != null) {
            campaign.updateContractAddress(command.getContractAddress());
        }
    }
}
