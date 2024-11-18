package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.campaign.domain.Campaign;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@SuperBuilder
@DiscriminatorValue("c")
@Table(name = "campaign_donation")
@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CampaignDonation extends Donation {
    @NotNull
    @JoinColumn(name = "campaign_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Campaign campaign;

    @Column
    @NotNull
    private String message;
}
