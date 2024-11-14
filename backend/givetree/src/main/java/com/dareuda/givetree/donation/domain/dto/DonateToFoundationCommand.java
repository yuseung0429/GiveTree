package com.dareuda.givetree.donation.domain.dto;

import lombok.*;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class DonateToFoundationCommand {
    @NonNull
    private Long memberId;
    @NonNull
    private Long foundationId;
    @NonNull
    private Long amount;
    @NonNull
    private String message;
    @NonNull
    private String simplePassword;
}
