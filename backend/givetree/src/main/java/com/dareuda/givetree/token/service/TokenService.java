package com.dareuda.givetree.token.service;

import com.dareuda.givetree.token.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final UserTokenCharger userTokenCharger;
    private final TokenExchanger tokenExchanger;
    private final UserTokenExchanger userTokenExchanger;
    private final FoundationTokenExchanger foundationTokenExchanger;

    public void chargeUserToken(long memberId, long amount, String simplePassword) {
        userTokenCharger.charge(memberId, amount, simplePassword);
    }

    public void exchangeUserToken(long userId, long amount, String simplePassword) {
        userTokenExchanger.exchange(userId, amount, simplePassword);
    }

    public void exchangeFoundationToken(long foundationId, String simplePassword, List<Long> transactionIds) {
        foundationTokenExchanger.exchange(foundationId, simplePassword, transactionIds);
    }
}
