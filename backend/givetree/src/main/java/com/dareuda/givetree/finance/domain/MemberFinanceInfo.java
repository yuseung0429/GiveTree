package com.dareuda.givetree.finance.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Getter
@Entity
@Builder
@Table(name = "member_finance_info")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberFinanceInfo {
    @Id
    @Column(name = "member_id")
    private Long id;

    @NotNull
    @Column(name = "user_key")
    private UUID userKey;
}