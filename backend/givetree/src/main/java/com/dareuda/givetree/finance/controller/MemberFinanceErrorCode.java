package com.dareuda.givetree.finance.controller;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MemberFinanceErrorCode implements ErrorCode {
    MEMBER_FINANCE_NOT_FOUND(HttpStatus.NOT_FOUND, "사용자 금융 정보가 없습니다."),
    MEMBER_EXTERNAL_SERVER_ALREADY_REGISTERED(HttpStatus.UNPROCESSABLE_ENTITY, "이미 다른 애플리케이션에 등록된 사용자입니다."),
    MEMBER_FINANCE_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 등록된 사용자 금융 정보입니다."),
    MEMBER_FINANCE_SIMPLE_PASSWORD_MISMATCH(HttpStatus.UNAUTHORIZED, "간편 비밀번호가 일치하지 않습니다.");
    private final HttpStatus httpStatus;
    private final String message;
}
