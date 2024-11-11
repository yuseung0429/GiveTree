package com.dareuda.givetree.member.domain.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberSearchFilter {
    private final String name;
}
