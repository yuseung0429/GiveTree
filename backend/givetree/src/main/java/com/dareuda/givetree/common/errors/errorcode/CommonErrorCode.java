package com.dareuda.givetree.common.errors.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommonErrorCode implements ErrorCode {

    BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),
    INVALID_ARGUMENT(HttpStatus.BAD_REQUEST, "유효하지 않은 인수가 포함되어 있습니다."),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "자원을 찾을 수 없습니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "인증에 실패했습니다."),
    FORBIDDEN(HttpStatus.FORBIDDEN, "권한이 없습니다."),
    RESOURCE_CONFLICT(HttpStatus.CONFLICT, "자원 충돌이 발생했습니다."),

    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부에 오류가 발생했습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
