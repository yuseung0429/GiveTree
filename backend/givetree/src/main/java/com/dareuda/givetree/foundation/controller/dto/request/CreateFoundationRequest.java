package com.dareuda.givetree.foundation.controller.dto.request;

import com.dareuda.givetree.foundation.domain.dto.CreateFoundationCommand;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CreateFoundationRequest {
    @NotBlank
    private final String introduction;

    @NotBlank
    private final String corporateRegistrationNumber;

    private final String imageUrl;

    public CreateFoundationCommand convertToCommand() {
        return new CreateFoundationCommand(introduction, corporateRegistrationNumber, imageUrl);
    }
}
