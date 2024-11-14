package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.member.domain.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Builder
@Table(name = "foundation_donate_subscription")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FoundationDonateSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "foundation_donate_subscription_id")
    private Long id;

    @NotNull
    @JoinColumn(name = "member_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @NotNull
    @JoinColumn(name = "foundation_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Foundation foundation;

    @Column
    @NotNull
    private Long amount;
}
