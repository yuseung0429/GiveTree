package com.dareuda.givetree.account.controller;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum AccountErrorCode implements ErrorCode {
    ACCOUNT_EXPIRED(HttpStatus.FORBIDDEN, "유효기간이 만료된 계좌입니다."),
    EXTERNAL_ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 외부 계좌 정보가 없습니다."),
    ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 내부 계좌 정보가 없습니다."),
    ACTIVE_ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND, "등록된 계좌 정보가 없습니다."),
    ACTIVE_ACCOUNT_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 등록된 계좌가 있습니다.");
    private final HttpStatus httpStatus;
    private final String message;
}
