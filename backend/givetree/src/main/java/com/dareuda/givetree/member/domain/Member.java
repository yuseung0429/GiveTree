package com.dareuda.givetree.member.domain;

import com.dareuda.givetree.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
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
    @NotNull
    private String name;

    @Column
    @NotNull
    private String phoneNumber;

    @Column
    @NotNull
    private String address;

    @Builder
    public Member(String email, String name, String phoneNumber, String address) {
        this.email = email;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}
