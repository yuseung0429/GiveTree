package com.dareuda.givetree.history.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class LedgerInfo {
    private String accountNumber;
    private String name;
    private String bankCode;
    private String bankName;
    private String message;
    private Long amount;
    private LedgerType type;
    private LocalDateTime processedAt;

    public static LedgerInfo from(Ledger ledger) {
        return LedgerInfo.builder()
                .accountNumber(ledger.getAccount().getAccountNumber())
                .name(ledger.getAccount().getName())
                .bankCode(ledger.getAccount().getBank().getCode())
                .bankName(ledger.getAccount().getBank().getName())
                .message(ledger.getMessage())
                .amount(ledger.getAmount())
                .type(ledger.getType())
                .processedAt(ledger.getProcessedAt())
                .build();
    }
}
