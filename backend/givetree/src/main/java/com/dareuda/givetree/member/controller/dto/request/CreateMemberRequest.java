package com.dareuda.givetree.member.controller.dto.request;

import com.dareuda.givetree.member.domain.Role;
import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CreateMemberRequest {
    @Email
    private final String email;

    @NotBlank
    private final String password;

    @NotBlank
    private final String name;

    private final String profileImageUrl;

    @NotBlank
    private final String role;

    public CreateMemberCommand convertToCommand() {
        return CreateMemberCommand.builder()
                .email(email)
                .password(password)
                .name(name)
                .profileImageUrl(profileImageUrl)
                .role(Role.valueOf(role))
                .build();
    }
}
