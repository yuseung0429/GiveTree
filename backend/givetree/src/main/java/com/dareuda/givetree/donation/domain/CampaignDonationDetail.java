package com.dareuda.givetree.donation.domain;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class CampaignDonationDetail {
    @NonNull
    private final Long id;

    @NonNull
    private final Long donorId;

    @NonNull
    private final Long campaign;

    private final String campaignProfileImage;

    @NonNull
    private final Long amount;

    @NonNull
    private final LocalDate date;
}
