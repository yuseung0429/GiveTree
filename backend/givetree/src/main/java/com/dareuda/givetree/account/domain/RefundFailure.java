package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.history.domain.Ledger;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Entity
@Builder
@Table(name = "refund_failure")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RefundFailure {
    @Id
    @Column(name = "refund_faulure_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @JoinColumn(name = "ledger_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Ledger ledger;

    @NotNull
    @Column(name = "amount")
    private Long amount;

    @NotNull
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "processed_at")
    private LocalDateTime processedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public void process() {
        processedAt = LocalDateTime.now();
    }
}
