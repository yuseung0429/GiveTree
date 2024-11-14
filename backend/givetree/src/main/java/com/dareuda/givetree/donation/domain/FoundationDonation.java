package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.foundation.domain.Foundation;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@SuperBuilder
@DiscriminatorValue("f")
@Table(name = "foundation_donation")
@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FoundationDonation extends Donation {
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "foundation_id")
    private Foundation foundation;

    @NotNull
    @Enumerated(EnumType.STRING)
    private FoundationDonationType donationType;
}
