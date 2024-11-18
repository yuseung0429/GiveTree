package com.dareuda.givetree.notification.controller.dto.request;

import com.dareuda.givetree.notification.domain.FcmMessageData;
import lombok.Getter;

@Getter
public class SendNotificationRequest {

    private String token;

    private String title;

    private String body;

    public FcmMessageData toNotification() {
        return FcmMessageData.of(title, body);
    }
}
