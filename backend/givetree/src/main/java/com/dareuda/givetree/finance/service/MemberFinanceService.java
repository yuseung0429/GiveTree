package com.dareuda.givetree.finance.service;

import com.dareuda.givetree.finance.domain.MemberFinanceAppender;
import com.dareuda.givetree.finance.domain.MemberFinanceReader;
import com.dareuda.givetree.finance.domain.MemberFinanceUpdater;
import com.dareuda.givetree.finance.domain.MemberFinanceValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberFinanceService {

    private final MemberFinanceAppender memberFinanceAppender;
    private final MemberFinanceUpdater memberFinanceUpdater;
    private final MemberFinanceReader memberFinanceReader;
    private final MemberFinanceValidator memberFinanceValidator;

    public boolean existsMemberFinance(long memberId) {
        return memberFinanceReader.isExists(memberId);
    }

    public void appendMemberFinance(long memberId, String simplePassword) {
        memberFinanceAppender.append(memberId, simplePassword);
    }

    public void updateMemberFinance(long memberId, String simplePassword) {
        memberFinanceUpdater.update(memberId, simplePassword);
    }

    public boolean validSimplePassword(long memberId, String simplePassword) {
        return memberFinanceValidator.validateSimplePasswordReturnBoolean(memberId, simplePassword);
    }
}
