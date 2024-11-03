package com.dareuda.givetree.finance.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.common.utils.SHA256Utils;
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

    private final SHA256Utils sha256Utils;
    private final MemberReader memberReader;
    private final MemberFinanceInfoLoader memberFinanceInfoLoader;
    private final MemberFinanceInfoValidator memberFinanceInfoValidator;
    private final MemberFinanceInfoRepository memberFinanceInfoRepository;

    public void append(long memberId, String password) {
        memberFinanceInfoValidator.validateAppendable(memberId);

        Member member = memberReader.read(memberId);

        MemberResponse response = memberFinanceInfoLoader.load(member.getId());

        String salt = sha256Utils.generate();
        String hashedPassword = sha256Utils.generate(password+salt);

        MemberFinanceInfo info = MemberFinanceInfo.builder()
                .id(member.getId())
                .userKey(response.getUserKey())
                .salt(salt)
                .simplePassword(hashedPassword)
                .build();
        memberFinanceInfoRepository.save(info);
    }
}
