package com.dareuda.givetree.notification.controller.dto.request;

import com.dareuda.givetree.notification.domain.Notification;
import lombok.Getter;

@Getter
public class SendNotificationRequest {

    private String token;

    private String title;

    private String body;

    public Notification toNotification() {
        return Notification.of(title, body);
    }
}
