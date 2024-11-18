package com.dareuda.givetree.foundation.controller;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum FoundationErrorCode implements ErrorCode {
    FOUNDATION_MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "재단 회원을 찾을 수 없습니다."),
    FOUNDATION_NOT_FOUND(HttpStatus.NOT_FOUND, "재단을 찾을 수 없습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
