package com.dareuda.givetree.finance.domain;

import com.dareuda.givetree.common.utils.SHA256Utils;
import com.dareuda.givetree.finance.infrastructure.MemberFinanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class MemberFinanceUpdater {

    private final SHA256Utils sha256Utils;
    private final MemberFinanceReader memberFinanceReader;
    private final MemberFinanceRepository memberFinanceRepository;

    @Transactional
    public void update(long memberId, String simplePassword) {
        MemberFinance memberFinance = memberFinanceReader.read(memberId);

        String salt = sha256Utils.generate();
        String hashedPassword = sha256Utils.generate(simplePassword+salt);

        memberFinance.changeSalt(salt);
        memberFinance.changeSimplePassword(hashedPassword);
    }
}
