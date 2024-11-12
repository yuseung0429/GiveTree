package com.dareuda.givetree.history.domain;

import com.dareuda.givetree.account.domain.Account;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Entity
@Builder
@Table(name = "ledger")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Ledger {
    @Id
    @Column(name = "ledger_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @NotNull
    @Column(name = "amount")
    private Long amount;

    @NotNull
    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private LedgerType type;

    @NotNull
    @Column(name = "message")
    private String message;

    @NotNull
    @Column(name = "processed_at")
    private LocalDateTime processedAt;
}
