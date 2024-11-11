package com.dareuda.givetree.member.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.member.controller.MemberErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberValidator {

    private final MemberReader memberReader;

    public void validateUser(long memberId) {
        Member member = memberReader.read(memberId);
        if (member.getRole() != Role.USER)
            throw new RestApiException(MemberErrorCode.MEMBER_NOT_USER);
    }

    public void validateFoundation(long memberId) {
        Member member = memberReader.read(memberId);
        if (member.getRole() != Role.FOUNDATION)
            throw new RestApiException(MemberErrorCode.MEMBER_NOT_FOUNDATION);
    }

}
