package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.campaign.domain.dto.CreateCampaignCommand;
import com.dareuda.givetree.campaign.infrastructure.CampaignRepository;
import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.foundation.domain.FoundationReader;
import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.media.domain.ImageAppender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CampaignCreator {
    private final CampaignRepository campaignRepository;
    private final FoundationReader foundationReader;
    private final ImageAppender imageAppender;

    @Transactional
    public long create(CreateCampaignCommand command) {
        Foundation foundation = foundationReader.read(command.getFoundationId());

        Image titleImage = null;
        List<Image> images = new ArrayList<>();

        if (command.getTitleImageUrl() != null) {
            titleImage = imageAppender.append(command.getTitleImageUrl());
        }
        if (command.getImageUrls() != null) {
            command.getImageUrls().forEach(imageUrl ->
                    images.add(imageAppender.append(imageUrl))
            );
        }

        Campaign campaign = campaignRepository.save(
                Campaign.createCampaign(
                        foundation,
                        command.getName(),
                        command.getStartDate(),
                        command.getEndDate(),
                        command.getTargetFundraisingAmount(),
                        titleImage,
                        images
                )
        );

        return campaign.getId();
    }
}
