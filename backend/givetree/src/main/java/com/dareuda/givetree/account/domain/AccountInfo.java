package com.dareuda.givetree.account.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class AccountInfo {

    private final String accountNumber;
    private final String accountName;
    private final LocalDate createdAt;
    private final LocalDate expiryAt;
    private final String bankName;

    public static AccountInfo from(Account account) {
        return AccountInfo.builder()
                .accountNumber(account.getAccountNumber())
                .accountName(account.getName())
                .createdAt(account.getCreatedAt())
                .expiryAt(account.getExpiryAt())
                .bankName(account.getBank().getName())
                .build();
    }
}
