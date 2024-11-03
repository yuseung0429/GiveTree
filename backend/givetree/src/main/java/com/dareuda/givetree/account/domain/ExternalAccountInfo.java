package com.dareuda.givetree.account.domain;

import com.ssafy.finance.response.demand_deposit.DemandDepositAccountResponse;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ExternalAccountInfo {

    private final String accountNumber;
    private final String name;
    private final LocalDate createdAt;
    private final LocalDate expiryAt;
    private final String bankCode;
    private final String bankName;
    private final Long balance;

    public static ExternalAccountInfo from(DemandDepositAccountResponse response) {
        return ExternalAccountInfo.builder()
                .accountNumber(response.getAccountNo())
                .name(response.getAccountName())
                .createdAt(response.getAccountCreatedDate())
                .expiryAt(response.getAccountExpiryDate())
                .bankCode(response.getBankCode())
                .bankName(response.getBankName())
                .balance(response.getAccountBalance())
                .build();
    }
}
