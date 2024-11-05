package com.dareuda.givetree.account.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import okhttp3.internal.http2.ErrorCode;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum BankErrorCode implements ErrorCode {
    BANK_NOT_FOUND(HttpStatus.NOT_FOUND, "은행이 존재하지 않습니다.");
    private final HttpStatus httpStatus;
    private final String message;
}
