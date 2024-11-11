package com.dareuda.givetree.history.controller;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TransactionErrorCode implements ErrorCode {
    TRANSACTION_NOT_FOUND(HttpStatus.NOT_FOUND, "토큰 거래 내역을 찾을 수 없습니다."),
    TRANSACTION_ALREADY_PROCESSED(HttpStatus.BAD_REQUEST, "이미 처리된 트랜잭션입니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
