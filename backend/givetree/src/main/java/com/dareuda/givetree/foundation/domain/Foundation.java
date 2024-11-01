package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.common.domain.BaseEntity;
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
    @Id @GeneratedValue
    @Column(name = "foundation_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @Column
    @NotNull
    private String introduction;

    @Column
    @NotNull
    private String corporateRegistrationNumber;

    // private Image image;

    @Builder
    public Foundation(String introduction, String corporateRegistrationNumber) {
        this.introduction = introduction;
        this.corporateRegistrationNumber = corporateRegistrationNumber;
    }
}
