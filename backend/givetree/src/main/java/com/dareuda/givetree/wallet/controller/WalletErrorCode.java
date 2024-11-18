package com.dareuda.givetree.wallet.controller;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum WalletErrorCode implements ErrorCode {
    WALLET_GENERATE_FAIL(HttpStatus.INTERNAL_SERVER_ERROR, "지갑 생성에 실패했습니다."),
    WALLET_NOT_FOUND(HttpStatus.NOT_FOUND, "지갑을 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
