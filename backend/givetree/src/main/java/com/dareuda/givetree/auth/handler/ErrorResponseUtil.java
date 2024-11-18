package com.dareuda.givetree.auth.handler;

import com.dareuda.givetree.common.errors.errorcode.ErrorCode;
import com.dareuda.givetree.common.errors.response.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class ErrorResponseUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static String createErrorResponse(ErrorCode errorCode) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .code(errorCode.name())
                .message(errorCode.getMessage())
                .build();

        return objectMapper.writeValueAsString(errorResponse);
    }
}
