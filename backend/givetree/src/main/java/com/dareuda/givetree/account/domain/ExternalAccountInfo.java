package com.dareuda.givetree.account.domain;

import com.ssafy.finance.response.demand_deposit.DemandDepositAccountResponse;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ExternalAccountInfo {

    private final String accountNo;
    private final String accountName;
    private final String accountTypeName;
    private final LocalDate createdDate;
    private final LocalDate expiryDate;
    private final String bankCode;
    private final String bankName;
    private final Long balance;

    public static ExternalAccountInfo from(DemandDepositAccountResponse response) {
        return ExternalAccountInfo.builder()
                .accountNo(response.getAccountNo())
                .accountName(response.getAccountName())
                .accountTypeName(response.getAccountTypeName())
                .createdDate(response.getAccountCreatedDate())
                .expiryDate(response.getAccountExpiryDate())
                .bankCode(response.getBankCode())
                .bankName(response.getBankName())
                .balance(response.getAccountBalance())
                .build();
    }
}
