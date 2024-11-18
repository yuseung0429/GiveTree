package com.dareuda.givetree.member.controller.dto.request;

import com.dareuda.givetree.member.domain.dto.UpdateMemberCommand;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UpdateMemberRequest {
    private final String password;
    private final String name;
    private final String profileImageUrl;

    public UpdateMemberCommand convertToCommand() {
        return UpdateMemberCommand.builder()
                .password(password)
                .name(name)
                .profileImageUrl(profileImageUrl)
                .build();
    }
}
