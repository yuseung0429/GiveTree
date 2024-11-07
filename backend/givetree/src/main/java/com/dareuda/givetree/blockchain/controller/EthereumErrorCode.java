package com.dareuda.givetree.blockchain.controller;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum EthereumErrorCode implements ErrorCode {
    ETHEREUM_CALL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "이더리움 네트워크 요청 실패"),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
