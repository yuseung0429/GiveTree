package com.dareuda.givetree.member.domain.dto;

import com.dareuda.givetree.member.domain.Role;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CreateMemberCommand {
    private final String email;

    private final String password;

    private final String name;

    private final String imageUrl;

    private final Role role;
}
