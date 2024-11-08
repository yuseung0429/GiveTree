package com.dareuda.givetree.account.domain;

import com.ssafy.finance.enums.TransactionType;
import com.ssafy.finance.response.demand_deposit.DemandDepositAccountTransferResponse;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class AccountTransferReceipt {
    private final Long transactionUniqueNo;
    private final String accountNo;
    private final LocalDate transactionDate;
    private final TransactionType transactionType;
    private final String transactionAccountNo;

    public static AccountTransferReceipt from(DemandDepositAccountTransferResponse response) {
        return AccountTransferReceipt.builder()
                .transactionUniqueNo(response.getTransactionUniqueNo())
                .accountNo(response.getAccountNo())
                .transactionDate(response.getTransactionDate())
                .transactionType(response.getTransactionType())
                .transactionAccountNo(response.getTransactionAccountNo())
                .build();
    }
}
