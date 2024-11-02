package com.dareuda.givetree.member.controller.dto.request;

import com.dareuda.givetree.member.domain.dto.UpdateMemberCommand;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UpdateMemberRequest {
    private final String email;
    private final String password;
    private final String name;
    private final String phoneNumber;
    private final String address;
    private final Long profileImageId;

    public UpdateMemberCommand convertToCommand() {
        return new UpdateMemberCommand(email, password, name, phoneNumber, address, profileImageId);
    }
}
