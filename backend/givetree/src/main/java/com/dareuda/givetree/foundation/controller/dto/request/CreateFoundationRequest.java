package com.dareuda.givetree.foundation.controller.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CreateFoundationRequest {
    private final String email;
    private final String name;
    private final String address;
    private final String phoneNumber;
    private final String introduction;
    private final String corporateRegistrationNumber;
}
