package com.dareuda.givetree.finance.controller;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum FinanceErrorCode implements ErrorCode {
    MEMBER_ALREADY_REGISTERED(HttpStatus.UNPROCESSABLE_ENTITY, "이미 다른 애플리케이션에 등록된 사용자입니다.");
    private final HttpStatus httpStatus;
    private final String message;
}
