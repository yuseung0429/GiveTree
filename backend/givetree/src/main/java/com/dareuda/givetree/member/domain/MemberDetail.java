package com.dareuda.givetree.member.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class MemberDetail {
    private final String email;
    private final String name;
    private final String phoneNumber;
    private final String address;
}
