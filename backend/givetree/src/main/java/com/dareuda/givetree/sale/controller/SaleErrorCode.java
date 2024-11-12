package com.dareuda.givetree.sale.controller;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SaleErrorCode implements ErrorCode {

    PRICE_EXCEEDS_CONTRIBUTION(HttpStatus.BAD_REQUEST, "판매 금액은 후원 금액을 초과할 수 없습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
