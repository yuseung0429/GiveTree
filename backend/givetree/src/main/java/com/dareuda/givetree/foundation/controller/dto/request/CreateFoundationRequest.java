package com.dareuda.givetree.foundation.controller.dto.request;

import com.dareuda.givetree.foundation.domain.dto.CreateFoundationCommand;
import com.dareuda.givetree.member.domain.Role;
import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@RequiredArgsConstructor
public class CreateFoundationRequest {
    @Email
    private final String email;

    @NotBlank
    private final String password;

    @NotBlank
    private final String name;

    private final String profileImageUrl;

    @NotBlank
    private final String introduction;

    @NotBlank
    private final String corporateRegistrationNumber;

    @NotBlank
    private final String phoneNumber;

    @NotBlank
    private final String address;

    private final String titleImageUrl;

    private final List<String> imageUrls = new ArrayList<>();

    private final List<String> categories = new ArrayList<>();

    public CreateFoundationCommand convertToCommand() {
        CreateMemberCommand createMemberCommand = CreateMemberCommand.builder()
                .email(email)
                .password(password)
                .name(name)
                .profileImageUrl(profileImageUrl)
                .role(Role.FOUNDATION)
                .build();

        return CreateFoundationCommand.builder()
                .createMemberCommand(createMemberCommand)
                .introduction(introduction)
                .corporateRegistrationNumber(corporateRegistrationNumber)
                .phoneNumber(phoneNumber)
                .address(address)
                .titleImageUrl(titleImageUrl)
                .imageUrls(imageUrls)
                .categories(categories)
                .build();
    }
}
