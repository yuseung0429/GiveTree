package com.dareuda.givetree.donation.controller;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum DonationErrorCode implements ErrorCode {
    FOUNDATION_DONATION_SUBSCRIPTION_ALREADY_EXISTS(HttpStatus.CONFLICT, "재단 정기 후원이 이미 존재합니다."),
    FOUNDATION_DONATION_SUBSCRIPTION_NOT_FOUND(HttpStatus.NOT_FOUND, "재단 정기 후원이 존재하지 않습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
