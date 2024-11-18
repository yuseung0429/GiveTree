package com.dareuda.givetree.notification.domain;

import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class FcmMessageWriter {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static String write(String fcmToken, FcmMessageData fcmMessageData) {
        FcmMessage.Message message = new FcmMessage.Message(fcmToken, fcmMessageData);
        FcmMessage fcmMessage = new FcmMessage(false, message);

        try {
            return objectMapper.writeValueAsString(fcmMessage);

        } catch (JsonProcessingException e) {
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
