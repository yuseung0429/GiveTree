package com.dareuda.givetree.finance.domain;

import com.dareuda.givetree.finance.controller.MemberFinanceErrorCode;
import com.dareuda.givetree.finance.infrastructure.MemberFinanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberFinanceReader {

    private final MemberFinanceRepository memberFinanceRepository;

    public MemberFinance read(long memberId) {
        return memberFinanceRepository.findById(memberId)
                .orElseThrow(new RestApiException(MemberFinanceErrorCode.MEMBER_FINANCE_NOT_FOUND));
    }

    public boolean isExists(long memberId) {
        return memberFinanceRepository.existsById(memberId);
    }
}
