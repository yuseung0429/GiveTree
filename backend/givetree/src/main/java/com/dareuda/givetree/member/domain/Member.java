package com.dareuda.givetree.member.domain;

import com.dareuda.givetree.common.domain.BaseEntity;
import com.dareuda.givetree.media.domain.Image;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {
    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    @Column
    @NotNull
    private String email;

    @Column
    private String password;

    @Column
    @NotNull
    private String name;

    @Column
    @NotNull
    private String phoneNumber;

    @Column
    @NotNull
    private String address;

    @OneToOne(orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_image_id")
    private Image profileImage;

    @Column
    @NotNull
    private boolean isDeleted;

    public static Member createMember(String email, String password, String name, String phoneNumber, String address, Image image) {
        Member member = new Member();
        member.email = email;
        member.password = password;
        member.name = name;
        member.phoneNumber = phoneNumber;
        member.address = address;

        member.isDeleted = false;

        return member;
    }

    public void updateEmail(String email) {
        this.email = email;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updateName(String name) {
        this.name = name;
    }

    public void updatePhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void updateAddress(String address) {
        this.address = address;
    }

    public void updateProfileImage(Image profileImage) {
        this.profileImage = profileImage;
    }

    public void delete() {
        isDeleted = true;
    }
}
