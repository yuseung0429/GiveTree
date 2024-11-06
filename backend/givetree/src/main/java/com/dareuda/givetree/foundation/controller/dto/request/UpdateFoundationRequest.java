package com.dareuda.givetree.foundation.controller.dto.request;

import com.dareuda.givetree.foundation.domain.dto.UpdateFoundationCommand;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

@Getter
@RequiredArgsConstructor
public class UpdateFoundationRequest {
    private final String introduction;
    private final String corporateRegistrationNumber;
    private final String phoneNumber;
    private final String address;
    private final String titleImageUrl;
    private final List<String> newImageUrls;
    private final List<UUID> deleteImageIds;

    public UpdateFoundationCommand convertToCommand() {
        return UpdateFoundationCommand.builder()
                .introduction(introduction)
                .corporateRegistrationNumber(corporateRegistrationNumber)
                .phoneNumber(phoneNumber)
                .address(address)
                .titleImageUrl(titleImageUrl)
                .newImageUrls(newImageUrls)
                .deleteImageIds(deleteImageIds)
                .build();
    }
}
