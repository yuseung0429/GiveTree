package com.dareuda.givetree.common.errors.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommonErrorCode implements ErrorCode {
    INVALID_ARGUMENT(HttpStatus.BAD_REQUEST, "유효하지 않은 인수가 포함되어 있습니다."),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "요청 처리 과정에서 자원을 찾을 수 없는 문제가 발생했습니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "인증이 필요한 요청입니다."),
    FORBIDDEN(HttpStatus.FORBIDDEN, "인가가 필요한 요청입니다."),

    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부에 오류가 발생했습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
