package com.dareuda.givetree.member.domain.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CreateMemberCommand {
    @NonNull
    private final String email;

    @NonNull
    private final String password;

    @NonNull
    private final String name;

    @NonNull
    private final String phoneNumber;

    @NonNull
    private final String address;

    private final String profileImageUrl;
}
