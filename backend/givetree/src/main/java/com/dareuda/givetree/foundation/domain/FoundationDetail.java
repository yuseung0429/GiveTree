package com.dareuda.givetree.foundation.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class FoundationDetail {
    @NonNull
    private final String introduction;

    @NonNull
    private final String corporateRegistrationNumber;

    private final String imageUrl;
}
