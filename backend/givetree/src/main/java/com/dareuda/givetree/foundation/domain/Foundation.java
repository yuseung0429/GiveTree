package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.common.domain.BaseEntity;
import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.member.domain.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Foundation extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "foundation_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    @NotNull
    private Member owner;

    @Column
    @NotNull
    private String introduction;

    @Column
    @NotNull
    private String corporateRegistrationNumber;

    @Column
    @NotNull
    private String phoneNumber;

    @Column
    @NotNull
    private String address;

    @Column
    @NotNull
    private long totalFundraisingAmount = 0L;

    @Column
    @NotNull
    private long executedAmount = 0L;

    @OneToOne(fetch = FetchType.LAZY, orphanRemoval = true, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "title_image_id")
    private Image titleImage;

    @Column
    @NotNull
    private int nextImageOrderSequence = 1;

    @OneToMany(mappedBy = "foundation", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<FoundationImage> images = new ArrayList<>();

    public static Foundation createFoundation(Member owner, String introduction, String corporateRegistrationNumber, String phoneNumber, String address, Image titleImage, List<Image> images) {
        Foundation foundation = new Foundation();
        foundation.owner = owner;
        foundation.introduction = introduction;
        foundation.corporateRegistrationNumber = corporateRegistrationNumber;
        foundation.phoneNumber = phoneNumber;
        foundation.address = address;
        foundation.titleImage = titleImage;

        images.forEach(foundation::addImage);

        return foundation;
    }

    public void updateOwner(Member owner) {
        this.owner = owner;
    }
    public void updateIntroduction(String introduction) {
        this.introduction = introduction;
    }
    public void updateCorporateRegistrationNumber(String corporateRegistrationNumber) {
        this.corporateRegistrationNumber = corporateRegistrationNumber;
    }
    public void updateTitleImage(Image titleImage) {
        this.titleImage = titleImage;
    }
    public void updateTotalFundraisingAmount(long totalFundraisingAmount) {
        this.totalFundraisingAmount = totalFundraisingAmount;
    }
    public void updateExecutedAmount(long executedAmount) {
        this.executedAmount = executedAmount;
    }
    public void updatePhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public void updateAddress(String address) {
        this.address = address;
    }

    public void addImage(Image image) {
        FoundationImage foundationImage = new FoundationImage(this, image, nextImageOrderSequence++);
        images.add(foundationImage);
    }
    public void deleteImage(UUID imageId) {
        images.removeIf(foundationImage -> foundationImage.getImage().getId().equals(imageId));
    }
}
