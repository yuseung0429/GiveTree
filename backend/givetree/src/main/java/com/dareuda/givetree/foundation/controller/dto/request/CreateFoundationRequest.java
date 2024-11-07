package com.dareuda.givetree.foundation.controller.dto.request;

import com.dareuda.givetree.foundation.domain.dto.CreateFoundationCommand;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class CreateFoundationRequest {
    @NotBlank
    private final String introduction;

    @NotBlank
    private final String corporateRegistrationNumber;

    @NotBlank
    private final String phoneNumber;

    @NotBlank
    private final String address;

    private final String titleImageUrl;

    private final List<String> imageUrls;

    public CreateFoundationCommand convertToCommand() {
        return CreateFoundationCommand.builder()
                .introduction(introduction)
                .corporateRegistrationNumber(corporateRegistrationNumber)
                .phoneNumber(phoneNumber)
                .address(address)
                .titleImageUrl(titleImageUrl)
                .imageUrls(imageUrls)
                .build();
    }
}
