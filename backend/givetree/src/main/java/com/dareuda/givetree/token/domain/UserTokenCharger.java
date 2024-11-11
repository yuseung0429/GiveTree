package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.finance.domain.MemberFinanceValidator;
import com.dareuda.givetree.member.domain.MemberValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserTokenCharger {

    private final TokenCharger tokenCharger;
    private final MemberValidator memberValidator;
    private final MemberFinanceValidator memberFinanceValidator;

    public void charge(long userId, long amount, String simplePassword) {
        memberValidator.validateUser(userId);
        memberFinanceValidator.validateSimplePassword(userId, simplePassword);
        tokenCharger.charge(userId, amount);
    }
}
