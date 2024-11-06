package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.common.domain.BaseEntity;
import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.member.domain.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


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

    @OneToOne(fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private Image image;

    @Column
    @NotNull
    private long totalFundraisingAmount;

    @Column
    @NotNull
    private long executedAmount;

    @Column
    @NotNull
    private boolean isDeleted;

    @PrePersist
    public void prePersist() {
        totalFundraisingAmount = 0L;
        executedAmount = 0L;
        isDeleted = false;
    }

    public static Foundation createFoundation(Member owner, String introduction, String corporateRegistrationNumber, Image image) {
        Foundation foundation = new Foundation();
        foundation.owner = owner;
        foundation.introduction = introduction;
        foundation.corporateRegistrationNumber = corporateRegistrationNumber;
        foundation.image = image;

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
    public void updateImage(Image image) {
        this.image = image;
    }
    public void updateTotalFundraisingAmount(long totalFundraisingAmount) {
        this.totalFundraisingAmount = totalFundraisingAmount;
    }
    public void updateExecutedAmount(long executedAmount) {
        this.executedAmount = executedAmount;
    }

    public void delete() {
        isDeleted = true;
    }
}
