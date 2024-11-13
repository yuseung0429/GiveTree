package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.campaign.domain.Campaign;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.member.domain.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class CampaignDonation extends Donation {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_donation")
    @NotNull
    private Campaign campaign;

    @Column
    @NotNull
    private String message;

    @Builder
    public CampaignDonation(Member donor, Transaction transaction, Long amount, Campaign campaign, String message) {
        super(donor, transaction, amount);
        this.campaign = campaign;
        this.message = message;
    }
}
