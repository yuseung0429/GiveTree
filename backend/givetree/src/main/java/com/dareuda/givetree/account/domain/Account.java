package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.common.utils.ByteArrayToHexStringConverter;
import com.dareuda.givetree.member.domain.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Entity
@Builder
@Table(name = "account")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Account {
    @Id
    @Column(name = "account_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @Column(name = "account_number")
    private String accountNumber;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "created_at")
    private LocalDate createdAt;

    @NotNull
    @Column(name = "expiry_at")
    private LocalDate expiryAt;

    @NotNull
    @Column(name = "is_active")
    private Boolean isActive;

    @NotNull
    @Column(name = "simple_password")
    @Convert(converter = ByteArrayToHexStringConverter.class)
    private String simplePassword;

    @NotNull
    @Column(name = "salt")
    @Convert(converter = ByteArrayToHexStringConverter.class)
    private String salt;

    @NotNull
    @Column(name = "failure_count")
    private Integer failureCount;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bank_code")
    private Bank bank;

    @PrePersist
    private void prePersist() {
        failureCount = 0;
    }

    public void changeSimplePassword(String simplePassword) {
        this.simplePassword = simplePassword;
    }

    public void changeSalt(String salt) {
        this.salt = salt;
    }

    public void activate() {
        this.isActive = true;
    }

    public void deactivate() {
        this.isActive = false;
    }
}
