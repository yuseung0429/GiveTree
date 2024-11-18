package com.dareuda.givetree.history.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum LedgerType {
    CHARGE("토큰 충전", "Give Tree 토큰 충전"),
    EXCHANGE("Give Tree 토큰 환전","토큰 환전"),
    REFUND("Give Tree 금액 환불", "금액 환불");

    private final String depositMessage;
    private final String withdrawalMessage;
}