package com.dareuda.givetree.token.controller;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TokenErrorCode implements ErrorCode {
    TOKEN_EXCHANGE_FAILURE(HttpStatus.INTERNAL_SERVER_ERROR, "토큰 환전에 실패했습니다."),
    TOKEN_CHARGE_FAILURE(HttpStatus.INTERNAL_SERVER_ERROR, "토큰 충전에 실패했습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
