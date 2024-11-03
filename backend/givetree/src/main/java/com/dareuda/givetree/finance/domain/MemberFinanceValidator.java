package com.dareuda.givetree.finance.domain;

import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberFinanceValidator {

    private final MemberFinanceReader memberFinanceReader;

    public void validateAppendable(long memberId) {
        if (memberFinanceReader.isExists(memberId)) {
            throw new RestApiException(CommonErrorCode.RESOURCE_CONFLICT);
        }
    }
}
