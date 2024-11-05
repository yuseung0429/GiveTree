package com.dareuda.givetree.finance.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.finance.controller.MemberFinanceErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberFinanceValidator {

    private final MemberFinanceReader memberFinanceReader;

    public void validateAppendable(long memberId) {
        if (memberFinanceReader.isExists(memberId)) {
            throw new RestApiException(MemberFinanceErrorCode.MEMBER_FINANCE_ALREADY_EXISTS);
        }
    }
}
