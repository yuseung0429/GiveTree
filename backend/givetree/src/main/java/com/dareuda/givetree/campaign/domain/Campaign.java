package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.common.domain.BaseEntity;
import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.media.domain.Image;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;

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

    @OneToOne(fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private Image image;

    @Column
    @NotNull
    private long targetFundraisingAmount;

    @Column
    @NotNull
    private long currentFundraisingAmount;

    @Column
    @NotNull
    private boolean isDeleted;

    @PrePersist
    public void prePersist() {
        currentFundraisingAmount = 0L;
        isDeleted = false;
    }

    public static Campaign createCampaign(Foundation foundation, String name, LocalDate startDate, LocalDate endDate, Image image, long targetFundraisingAmount) {
        Campaign campaign = new Campaign();
        campaign.foundation = foundation;
        campaign.name = name;
        campaign.startDate = startDate;
        campaign.endDate = endDate;
        campaign.image = image;
        campaign.targetFundraisingAmount = targetFundraisingAmount;

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
    public void updateImage(Image image) {
        this.image = image;
    }
    public void updateTargetFundraisingAmount(long targetFundraisingAmount) {
        this.targetFundraisingAmount = targetFundraisingAmount;
    }
    public void updateCurrentFundraisingAmount(long currentFundraisingAmount) {
        this.currentFundraisingAmount = currentFundraisingAmount;
    }

    public void delete() {
        isDeleted = true;
    }
}
