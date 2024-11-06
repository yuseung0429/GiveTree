package com.dareuda.givetree.auth.domain;

import com.dareuda.givetree.member.domain.Role;
import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class OAuthUserProfile {

    private final String oAuthId;

    private final String name;

    private final String email;

    public CreateMemberCommand toCreateMemberCommand() {
        return new CreateMemberCommand(email, null, name, null, Role.USER);
    }
}
