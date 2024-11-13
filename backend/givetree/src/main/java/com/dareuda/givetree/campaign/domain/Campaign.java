package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.common.domain.BaseEntity;
import com.dareuda.givetree.common.utils.ByteArrayToHexStringConverter;
import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.media.domain.Image;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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

    @Column(name = "contract_address")
    @Convert(converter = ByteArrayToHexStringConverter.class)
    private String contractAddress;

    @Column
    @NotNull
    private String name;

    @Column
    @NotNull
    private String introduction;

    @Column
    @NotNull
    private LocalDate startDate;

    @Column
    @NotNull
    private LocalDate endDate;

    @Column
    @NotNull
    private long targetFundraisingAmount;

    @OneToOne(fetch = FetchType.LAZY, orphanRemoval = true, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "title_image_id")
    private Image titleImage;

    @OneToMany(mappedBy = "campaign", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<CampaignImage> images = new ArrayList<>();

    public static Campaign createCampaign(Foundation foundation, String name, String introduction, LocalDate startDate, LocalDate endDate, long targetFundraisingAmount, Image titleImage, List<Image> images) {
        Campaign campaign = new Campaign();
        campaign.foundation = foundation;
        campaign.name = name;
        campaign.introduction = introduction;
        campaign.startDate = startDate;
        campaign.endDate = endDate;
        campaign.targetFundraisingAmount = targetFundraisingAmount;

        campaign.titleImage = titleImage;
        images.forEach(campaign::addImage);

        return campaign;
    }

    public void updateName(String name) {
        this.name = name;
    }
    public void updateIntroduction(String introduction) {
        this.introduction = introduction;
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
    public void updateContractAddress(String contractAddress) {
        this.contractAddress = contractAddress;
    }

    public void addImage(Image image) {
        CampaignImage campaignImage = new CampaignImage(this, image);
        images.add(campaignImage);
    }
    public void deleteImages(List<Integer> removeImageOrders) {
        removeImageOrders.sort(Collections.reverseOrder());
        removeImageOrders.forEach(i -> images.remove((int) i));
    }
}
