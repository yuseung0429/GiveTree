package com.dareuda.givetree.foundation.controller.dto.request;

import com.dareuda.givetree.foundation.domain.dto.UpdateFoundationCommand;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UpdateFoundationRequest {
    private final String introduction;
    private final String corporateRegistrationNumber;
    private final String imageUrl;

    public UpdateFoundationCommand convertToCommand() {
        return new UpdateFoundationCommand(introduction, corporateRegistrationNumber, imageUrl);
    }
}
