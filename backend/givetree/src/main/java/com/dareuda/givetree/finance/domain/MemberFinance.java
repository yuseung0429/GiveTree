package com.dareuda.givetree.finance.domain;

import com.dareuda.givetree.common.utils.ByteArrayToHexStringConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Getter
@Entity
@Builder
@Table(name = "member_finance")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberFinance {
    @Id
    @Column(name = "member_id")
    private Long id;

    @NotNull
    @Column(name = "user_key")
    private UUID userKey;

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
}