package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.member.domain.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donation")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id")
    @NotNull
    private Member donor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id")
    @NotNull
    private Transaction transaction;

    @Column
    @NotNull
    private Long amount;

    @CreatedDate
    private LocalDateTime createdAt;

    protected Donation(Member donor, Transaction transaction, Long amount) {
        this.donor = donor;
        this.transaction = transaction;
        this.amount = amount;
    }
}
