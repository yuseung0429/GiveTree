package com.dareuda.givetree.donation.domain;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class FoundationDonationDetail {
    @NonNull
    private final Long id;

    @NonNull
    private final Long donorId;

    @NonNull
    private final Long foundationId;

    private final String foundationProfileImage;

    @NonNull
    private final Long amount;

    @NonNull
    private final String option;

    @NonNull
    private final LocalDate date;
}
