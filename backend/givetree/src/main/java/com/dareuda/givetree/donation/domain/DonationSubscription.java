package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.member.domain.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DonationSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donation_subscription")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "foundation_id")
    @NotNull
    private Foundation foundation;

    @Column
    @NotNull
    private Long amount;

    @Builder
    public DonationSubscription(Member member, Foundation foundation, Long amount) {
        this.member = member;
        this.foundation = foundation;
        this.amount = amount;
    }
}
