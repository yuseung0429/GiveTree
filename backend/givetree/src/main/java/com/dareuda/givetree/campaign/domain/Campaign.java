package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.common.domain.BaseEntity;
import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.media.domain.Image;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
public class Campaign extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "campaign_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "foundation_id")
    @NotNull
    private Foundation foundation;

    @Column
    @NotNull
    private String name;

    @Column
    @NotNull
    private LocalDate startDate;

    @Column
    @NotNull
    private LocalDate endDate;

    @Column
    @NotNull
    private long targetFundraisingAmount;

    @Column
    @NotNull
    private long currentFundraisingAmount = 0L;

    @OneToOne(fetch = FetchType.LAZY, orphanRemoval = true, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "title_image_id")
    private Image titleImage;

    @OneToMany(mappedBy = "campaign", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<CampaignImage> images = new ArrayList<>();

    @Column
    @NotNull
    private int nextImageOrderSequence = 1;

    public static Campaign createCampaign(Foundation foundation, String name, LocalDate startDate, LocalDate endDate, long targetFundraisingAmount, Image titleImage, List<Image> images) {
        Campaign campaign = new Campaign();
        campaign.foundation = foundation;
        campaign.name = name;
        campaign.startDate = startDate;
        campaign.endDate = endDate;
        campaign.targetFundraisingAmount = targetFundraisingAmount;

        campaign.titleImage = titleImage;
        images.forEach(campaign::addImage);

        return campaign;
    }

    public void updateFoundation(Foundation foundation) {
        this.foundation = foundation;
    }
    public void updateName(String name) {
        this.name = name;
    }
    public void updateStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    public void updateEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
    public void updateTitleImage(Image titleImage) {
        this.titleImage = titleImage;
    }
    public void updateTargetFundraisingAmount(long targetFundraisingAmount) {
        this.targetFundraisingAmount = targetFundraisingAmount;
    }
    public void updateCurrentFundraisingAmount(long currentFundraisingAmount) {
        this.currentFundraisingAmount = currentFundraisingAmount;
    }

    public void addImage(Image image) {
        CampaignImage campaignImage = new CampaignImage(this, image, nextImageOrderSequence++);
        images.add(campaignImage);
    }
    public void deleteImage(UUID imageId) {
        images.removeIf(campaignImage -> campaignImage.getImage().getId().equals(imageId));
    }
}
