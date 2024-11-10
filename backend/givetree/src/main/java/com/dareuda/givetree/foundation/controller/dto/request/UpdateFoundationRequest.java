package com.dareuda.givetree.foundation.controller.dto.request;

import com.dareuda.givetree.foundation.domain.dto.UpdateFoundationCommand;
import com.dareuda.givetree.member.domain.dto.UpdateMemberCommand;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class UpdateFoundationRequest {
    private final String password;
    private final String name;
    private final String profileImageUrl;
    private final String introduction;
    private final String corporateRegistrationNumber;
    private final String phoneNumber;
    private final String address;
    private final String titleImageUrl;
    private final List<String> newImageUrls;
    private final List<Integer> deleteImageOrders;

    public UpdateFoundationCommand convertToCommand() {
        UpdateMemberCommand updateMemberCommand = UpdateMemberCommand.builder()
                .password(password)
                .name(name)
                .profileImageUrl(profileImageUrl)
                .build();

        return UpdateFoundationCommand.builder()
                .updateMemberCommand(updateMemberCommand)
                .introduction(introduction)
                .corporateRegistrationNumber(corporateRegistrationNumber)
                .phoneNumber(phoneNumber)
                .address(address)
                .titleImageUrl(titleImageUrl)
                .newImageUrls(newImageUrls)
                .deleteImageOrders(deleteImageOrders)
                .build();
    }
}
