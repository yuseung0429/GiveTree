package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.account.controller.AccountErrorCode;
import com.dareuda.givetree.account.infrastructure.AccountRepository;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AccountReader {

    private final AccountRepository accountRepository;

    public Account read(long accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new RestApiException(AccountErrorCode.ACCOUNT_NOT_FOUND));
    }

    public Optional<Account> readOptionalByAccountNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber);
    }

    public Account readActiveAccount(long memberId) {
        return accountRepository.findByMemberIdAndIsActive(memberId, true)
                .orElseThrow(() -> new RestApiException(AccountErrorCode.ACTIVE_ACCOUNT_NOT_FOUND));
    }

    public boolean existsActiveAccount(long memberId) {
        return accountRepository.existsByMemberIdAndIsActive(memberId, true);
    }
}
