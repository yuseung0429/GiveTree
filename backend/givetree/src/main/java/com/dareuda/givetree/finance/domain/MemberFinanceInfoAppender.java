package com.dareuda.givetree.finance.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.finance.controller.FinanceErrorCode;
import com.dareuda.givetree.finance.infrastructure.MemberFinanceInfoRepository;
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
public class MemberFinanceInfoAppender {

    private final MemberReader memberReader;
    private final MemberFinanceInfoValidator memberFinanceInfoValidator;
    private final MemberFinanceInfoRepository memberFinanceInfoRepository;

    private final MemberApiClient memberApiClient;

    public void append(long memberId) {
        memberFinanceInfoValidator.validateAppendable(memberId);

        Member member = memberReader.read(memberId);

        MemberResponse response = retrieveMemberInfoFromApi(member);

        MemberFinanceInfo info = MemberFinanceInfo.builder()
                .id(member.getId())
                .userKey(response.getUserKey())
                .build();
        memberFinanceInfoRepository.save(info);
    }

    private MemberResponse retrieveMemberInfoFromApi(Member member) {
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
