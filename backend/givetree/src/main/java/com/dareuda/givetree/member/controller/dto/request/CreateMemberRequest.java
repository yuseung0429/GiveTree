package com.dareuda.givetree.member.controller.dto.request;

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

    private final String password;

    @NotBlank
    private final String name;

    @NotBlank
    private final String phoneNumber;

    @NotBlank
    private final String address;

    private final String profileImageUrl;

    public CreateMemberCommand convertToCommand() {
        return new CreateMemberCommand(email, password, name, phoneNumber, address, profileImageUrl);
    }
}
