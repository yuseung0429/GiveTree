package com.dareuda.givetree.foundation.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class UpdateFoundationCommand {
    private final String introduction;
    private final String corporateRegistrationNumber;
    private final String phoneNumber;
    private final String address;
    private final String titleImageUrl;
    private final List<String> newImageUrls;
    private final List<UUID> deleteImageIds;
}
