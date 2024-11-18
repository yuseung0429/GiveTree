package com.dareuda.givetree.history.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class TransactionInfo {
    private Long id;
    private String name;
    private Long amount;
    private LocalDateTime createdAt;
}
