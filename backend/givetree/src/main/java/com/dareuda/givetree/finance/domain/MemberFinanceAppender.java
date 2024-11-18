package com.dareuda.givetree.finance.domain;

import com.dareuda.givetree.common.utils.SHA256Utils;
import com.dareuda.givetree.finance.infrastructure.MemberFinanceRepository;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import com.ssafy.finance.response.member.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberFinanceAppender {

    private final SHA256Utils sha256Utils;
    private final MemberReader memberReader;
    private final MemberFinanceLoader memberFinanceLoader;
    private final MemberFinanceValidator memberFinanceValidator;
    private final MemberFinanceRepository memberFinanceRepository;

    public void append(long memberId, String simplePassword) {
        memberFinanceValidator.validateAppendable(memberId);

        Member member = memberReader.read(memberId);

        MemberResponse response = memberFinanceLoader.load(member.getId());

        String salt = sha256Utils.generate();
        String hashedPassword = sha256Utils.generate(simplePassword+salt);

        MemberFinance info = MemberFinance.builder()
                .id(member.getId())
                .userKey(response.getUserKey())
                .salt(salt)
                .simplePassword(hashedPassword)
                .build();
        memberFinanceRepository.save(info);
    }
}
