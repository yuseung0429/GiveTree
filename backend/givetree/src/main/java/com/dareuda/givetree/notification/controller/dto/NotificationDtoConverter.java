package com.dareuda.givetree.notification.controller.dto;

import com.dareuda.givetree.notification.controller.dto.response.ReadNotificationResponse;
import com.dareuda.givetree.notification.domain.Notification;

import java.util.List;

public class NotificationDtoConverter {

    public static List<ReadNotificationResponse> convert(List<Notification> notifications) {
        return notifications.stream()
                .map(ReadNotificationResponse::from)
                .toList();
    }
}
