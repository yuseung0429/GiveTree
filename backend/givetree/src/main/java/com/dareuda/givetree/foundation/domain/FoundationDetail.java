package com.dareuda.givetree.foundation.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class FoundationDetail {
    private final String introduction;
    private final String corporateRegistrationNumber;
}
