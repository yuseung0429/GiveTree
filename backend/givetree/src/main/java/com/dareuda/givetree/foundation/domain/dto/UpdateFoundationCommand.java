package com.dareuda.givetree.foundation.domain.dto;

import com.dareuda.givetree.member.domain.dto.UpdateMemberCommand;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class UpdateFoundationCommand {
    private final UpdateMemberCommand updateMemberCommand;
    private final String introduction;
    private final String corporateRegistrationNumber;
    private final String phoneNumber;
    private final String address;
    private final String titleImageUrl;
    private final List<String> newImageUrls;
    private final List<Integer> deleteImageOrders;
}
