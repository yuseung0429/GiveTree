package com.dareuda.givetree.media.controller;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MediaErrorCode implements ErrorCode {
    FILE_SPOOFING_DETECTED(HttpStatus.FORBIDDEN, "파일 스푸핑이 감지되었습니다."),
    MISSING_FILE(HttpStatus.BAD_REQUEST, "요청에 파일이 포함되어 있지 않습니다."),
    UNSUPPORTED_MEDIA_TYPE(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "허용되지 않은 파일 형식입니다."),
    UNSUPPORTED_IMAGE_EXTENSION(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "지원되지 않는 이미지 확장자입니다. 허용되는 확장자는 jpg, jpeg, png 입니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
