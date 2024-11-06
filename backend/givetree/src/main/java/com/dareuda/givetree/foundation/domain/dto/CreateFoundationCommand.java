package com.dareuda.givetree.foundation.domain.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CreateFoundationCommand {
    private final String introduction;
    private final String corporateRegistrationNumber;
    private final String imageUrl;
}
