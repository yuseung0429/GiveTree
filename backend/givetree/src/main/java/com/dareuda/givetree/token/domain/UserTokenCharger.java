package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.member.domain.MemberValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserTokenCharger {
    private final MemberValidator memberValidator;
    private final TokenCharger tokenCharger;

    public void charge(long senderId, long amount, String simplePassword) {
        memberValidator.validateUser(senderId);
        tokenCharger.charge(senderId, amount, simplePassword);
    }
}
