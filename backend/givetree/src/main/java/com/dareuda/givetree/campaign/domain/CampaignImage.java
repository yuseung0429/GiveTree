package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.media.domain.Image;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CampaignImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "campaign_image_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id")
    @NotNull
    private Campaign campaign;

    @OneToOne(fetch = FetchType.LAZY, orphanRemoval = true, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "image_id")
    @NotNull
    private Image image;

    @Column
    @NotNull
    private int imageOrder;

    public CampaignImage(Campaign campaign, Image image, int imageOrder) {
        this.campaign = campaign;
        this.image = image;
        this.imageOrder = imageOrder;
    }
}
