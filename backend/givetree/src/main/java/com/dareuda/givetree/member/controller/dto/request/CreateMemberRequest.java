package com.dareuda.givetree.member.controller.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CreateMemberRequest {
    private final String email;
    private final String name;
    private final String phoneNumber;
    private final String address;
}
