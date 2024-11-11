package com.dareuda.givetree.campaign.domain.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class CreateCampaignCommand {
    @NonNull
    private final String name;

    @NonNull
    private final String introduction;

    @NonNull
    private final LocalDate startDate;

    @NonNull
    private final LocalDate endDate;

    @NonNull
    private final Long targetFundraisingAmount;

    private final String titleImageUrl;

    @NonNull
    private final List<String> imageUrls;
}
