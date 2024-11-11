package com.dareuda.givetree.foundation.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class FoundationSearchFilter {
    private final String name;
    private final String category;
}
