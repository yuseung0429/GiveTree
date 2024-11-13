package com.dareuda.givetree.notification.controller;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum NotificationErrorCode implements ErrorCode {

    TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, "FCM 토큰을 찾을 수 없습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
