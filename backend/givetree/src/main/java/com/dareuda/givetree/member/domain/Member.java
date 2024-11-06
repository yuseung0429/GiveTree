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
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @OneToOne(fetch = FetchType.LAZY, orphanRemoval = true, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "profile_image_id")
    private Image profileImage;

    private Role role;

    public static Member createMember(String email, String password, String name, Image profileImage) {
        Member member = new Member();
        member.email = email;
        member.password = password;
        member.name = name;

        member.profileImage = profileImage;

        return member;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updateName(String name) {
        this.name = name;
    }

    public void updateProfileImage(Image profileImage) {
        this.profileImage = profileImage;
    }
}
