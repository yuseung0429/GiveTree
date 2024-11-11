package com.dareuda.givetree.account.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class AccountInfoReader {

    private final AccountReader accountReader;

    @Transactional(readOnly = true)
    public AccountInfo readActiveAccountInfo(long memberId) {
        Account account = accountReader.readActiveAccount(memberId);
        return convertAccount(account);
    }

    private AccountInfo convertAccount(Account account) {
        return AccountInfo.builder()
                .accountNumber(account.getAccountNumber())
                .name(account.getName())
                .createdAt(account.getCreatedAt())
                .expiryAt(account.getExpiryAt())
                .bankName(account.getBank().getName())
                .bankCode(account.getBank().getCode())
                .build();
    }
}
