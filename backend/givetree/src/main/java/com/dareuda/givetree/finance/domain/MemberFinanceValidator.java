package com.dareuda.givetree.finance.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.common.utils.SHA256Utils;
import com.dareuda.givetree.finance.controller.MemberFinanceErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class MemberFinanceValidator {

    private final MemberFinanceReader memberFinanceReader;
    private final SHA256Utils sha256Utils;

    public void validateAppendable(long memberId) {
        if (memberFinanceReader.isExists(memberId)) {
            throw new RestApiException(MemberFinanceErrorCode.MEMBER_FINANCE_ALREADY_EXISTS);
        }
    }

    public void validateSimplePassword(long memberId, String inputPassword) {
        MemberFinance memberFinance = memberFinanceReader.read(memberId);

        String simplePassword = sha256Utils.generate(inputPassword + memberFinance.getSalt());
        if (!Objects.equals(memberFinance.getSimplePassword(), simplePassword)) {
            throw new RestApiException(MemberFinanceErrorCode.MEMBER_FINANCE_SIMPLE_PASSWORD_MISMATCH);
        }
    }
}
