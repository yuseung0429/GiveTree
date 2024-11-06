package com.dareuda.givetree.member.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class MemberDetail {
    @NonNull
    private final Long id;

    @NonNull
    private final String email;

    @NonNull
    private final String name;

    @NonNull
    private final String Role;

    private final String profileImageUrl;
}
