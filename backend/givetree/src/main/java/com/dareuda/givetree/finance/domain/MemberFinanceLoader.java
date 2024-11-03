package com.dareuda.givetree.finance.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.finance.controller.FinanceErrorCode;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import com.ssafy.finance.client.MemberApiClient;
import com.ssafy.finance.exception.member.MemberAlreadyExistsException;
import com.ssafy.finance.exception.member.MemberNotFoundException;
import com.ssafy.finance.response.member.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberFinanceLoader {

    private final MemberApiClient memberApiClient;
    private final MemberReader memberReader;

    public MemberResponse load(long memberId) {
        Member member = memberReader.read(memberId);
        try {
            return memberApiClient.createMember(member.getEmail());
        } catch (MemberAlreadyExistsException e1) {
            try {
                return memberApiClient.searchMember(member.getEmail());
            } catch (MemberNotFoundException e2) {
                throw new RestApiException(FinanceErrorCode.MEMBER_ALREADY_REGISTERED);
            }
        }
    }
}