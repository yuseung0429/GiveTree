package com.dareuda.givetree.token.service;

import com.dareuda.givetree.token.domain.*;
import com.dareuda.givetree.wallet.domain.Wallet;
import com.dareuda.givetree.wallet.domain.WalletVO;
import com.dareuda.givetree.wallet.domain.member.MemberWalletReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final UserTokenCharger userTokenCharger;
    private final UserTokenExchanger userTokenExchanger;
    private final FoundationTokenExchanger foundationTokenExchanger;
    private final MemberWalletReader memberWalletReader;
    private final TokenBalanceLoader tokenBalanceLoader;

    public long loadTokenMemberBalance(long memberId) {
        Wallet wallet = memberWalletReader.readByMemberId(memberId);
        return tokenBalanceLoader.load(WalletVO.from(wallet));
    }

    public void chargeUserToken(long userId, long amount, String simplePassword) {
        userTokenCharger.charge(userId, amount, simplePassword);
    }

    public void exchangeUserToken(long userId, long amount, String simplePassword) {
        userTokenExchanger.exchange(userId, amount, simplePassword);
    }

    public void exchangeFoundationToken(long foundationId, List<Long> transactionIds, String simplePassword) {
        foundationTokenExchanger.exchange(foundationId, transactionIds, simplePassword);
    }
}
