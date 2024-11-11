package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.history.domain.Transaction;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Entity
@Builder
@Table(name = "exchange_failure")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ExchangeFailure {
    @Id
    @Column(name = "exchange_faulure_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @JoinColumn(name = "transaction_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Transaction transaction;

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
