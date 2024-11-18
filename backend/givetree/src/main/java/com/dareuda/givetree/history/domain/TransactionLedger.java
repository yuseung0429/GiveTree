package com.dareuda.givetree.history.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Entity
@Builder
@Table(name = "transaction_ledger")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TransactionLedger {
    @Id
    @Column(name = "transaction_id")
    private Long id;

    @MapsId
    @NotNull
    @OneToOne
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ledger_id")
    private Ledger ledger;
}
