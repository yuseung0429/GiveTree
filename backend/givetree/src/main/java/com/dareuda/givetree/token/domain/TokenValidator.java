package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.account.controller.AccountErrorCode;
import com.dareuda.givetree.account.domain.AccountReader;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TokenValidator {

    private final AccountReader accountReader;

    public void validateChargeable(long memberId) {
        if (!accountReader.existsActiveAccount(memberId))
            throw new RestApiException(AccountErrorCode.ACTIVE_ACCOUNT_NOT_FOUND);
    }

    public void validateExchangeable(long memberId) {
        if (!accountReader.existsActiveAccount(memberId))
            throw new RestApiException(AccountErrorCode.ACTIVE_ACCOUNT_NOT_FOUND);
    }
}
