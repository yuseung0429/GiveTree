package com.dareuda.givetree.ledger.controller;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum LedgerErrorCode implements ErrorCode {
    LEDGER_NOT_FOUND(HttpStatus.NOT_FOUND, "입출금 내역을 찾을 수 없습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
