package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.campaign.infrastructure.CampaignRepository;
import com.dareuda.givetree.category.domain.Category;
import com.dareuda.givetree.media.domain.Media;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FoundationDetailReader {
    private final FoundationReader foundationReader;
    private final CampaignRepository campaignRepository;

    @Transactional(readOnly = true)
    public FoundationDetail read(Foundation foundation) {
        String profileImageUrl = foundation.getMember().getProfileImage() != null ? foundation.getMember().getProfileImage().getUrl() : null;
        String titleImageUrl = foundation.getTitleImage() != null ? foundation.getTitleImage().getUrl() : null;
        List<String> imageUrls = foundation.getImages().stream().map(FoundationImage::getImage).map(Media::getUrl).toList();
        List<String> categories = foundation.getCategories().stream().map(FoundationCategory::getCategory).map(Category::getName).toList();
        int holdingCampaignCount = campaignRepository.countByFoundationId(foundation.getId());

        return FoundationDetail.builder()
                .id(foundation.getId())
                .email(foundation.getMember().getEmail())
                .name(foundation.getMember().getName())
                .profileImageUrl(profileImageUrl)
                .role(foundation.getMember().getRole().toString())
                .introduction(foundation.getIntroduction())
                .corporateRegistrationNumber(foundation.getCorporateRegistrationNumber())
                .totalFundraisingAmount(foundation.getTotalFundraisingAmount())
                .executedAmount(foundation.getExecutedAmount())
                .phoneNumber(foundation.getPhoneNumber())
                .address(foundation.getAddress())
                .titleImageUrl(titleImageUrl)
                .imageUrls(imageUrls)
                .categories(categories)
                .holdingCampaignCount(holdingCampaignCount)
                .build();
    }

    @Transactional(readOnly = true)
    public FoundationDetail read(long foundationId) {
        Foundation foundation = foundationReader.read(foundationId);

        return read(foundation);
    }
}
