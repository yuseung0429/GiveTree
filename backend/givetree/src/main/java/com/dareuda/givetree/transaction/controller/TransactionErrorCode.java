package com.dareuda.givetree.ledger.controller;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TransactionErrorCode implements ErrorCode {
    TRANSACTION_NOT_FOUND(HttpStatus.NOT_FOUND, "토큰 거래 내역을 찾을 수 없습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
