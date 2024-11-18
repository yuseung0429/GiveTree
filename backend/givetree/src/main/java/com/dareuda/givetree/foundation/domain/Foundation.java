package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.category.domain.Category;
import com.dareuda.givetree.category.domain.FoundationCategory;
import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.member.domain.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Foundation {
    @Id
    private Long id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, orphanRemoval = true, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    @NotNull
    private Member member;

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

    @OneToMany(mappedBy = "foundation", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<FoundationImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "foundation", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<FoundationCategory> categories = new ArrayList<>();

    public static Foundation createFoundation(Member member, String introduction, String corporateRegistrationNumber, String phoneNumber, String address, Image titleImage, List<Image> images, List<Category> categories) {
        Foundation foundation = new Foundation();
        foundation.member = member;
        foundation.introduction = introduction;
        foundation.corporateRegistrationNumber = corporateRegistrationNumber;
        foundation.phoneNumber = phoneNumber;
        foundation.address = address;
        foundation.titleImage = titleImage;

        images.forEach(foundation::addImage);
        categories.forEach(foundation::addCategory);

        return foundation;
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
        FoundationImage foundationImage = new FoundationImage(this, image);
        images.add(foundationImage);
    }
    public void deleteImages(List<Integer> removeImageOrders) {
        removeImageOrders.sort(Collections.reverseOrder());
        removeImageOrders.forEach(i -> images.remove((int) i));
    }

    public void addCategory(Category category) {
        FoundationCategory foundationCategory = new FoundationCategory(this, category);
        categories.add(foundationCategory);
    }
    public void deleteCategory(String category) {
        categories.removeIf(foundationCategory -> foundationCategory.getCategory().getName().equals(category));
    }
}
