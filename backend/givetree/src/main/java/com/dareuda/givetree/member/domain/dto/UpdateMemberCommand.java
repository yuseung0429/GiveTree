package com.dareuda.givetree.member.domain.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UpdateMemberCommand {
    private final String password;
    private final String name;
    private final String phoneNumber;
    private final String address;
    private final String profileImageUrl;
}
