package com.dareuda.givetree.member.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class UpdateMemberCommand {
    private final String password;
    private final String name;
    private final String profileImageUrl;
}
