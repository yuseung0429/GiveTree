package com.dareuda.givetree.history.domain;

import com.dareuda.givetree.common.utils.ByteArrayToHexStringConverter;
import com.dareuda.givetree.wallet.domain.Wallet;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Entity
@Builder
@Table(name = "transaction")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Transaction {
    @Id
    @Column(name = "transaction_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_wallet_id")
    private Wallet senderWallet;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_wallet_id")
    private Wallet receiverWallet;

    @NotNull
    @Column(name = "amount")
    private Long amount;

    @NotNull
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @NotNull
    @Column(name = "transaction_hash")
    @Convert(converter = ByteArrayToHexStringConverter.class)
    private String transactionHash;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
