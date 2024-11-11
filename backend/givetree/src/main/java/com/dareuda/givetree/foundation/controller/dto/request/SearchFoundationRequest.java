package com.dareuda.givetree.foundation.controller.dto.request;

import com.dareuda.givetree.foundation.domain.dto.FoundationSearchFilter;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SearchFoundationRequest {
    private final String name;
    private final String category;

    public FoundationSearchFilter convertToSearchFilter() {
        return FoundationSearchFilter.builder()
                .name(name)
                .category(category)
                .build();
    }
}
