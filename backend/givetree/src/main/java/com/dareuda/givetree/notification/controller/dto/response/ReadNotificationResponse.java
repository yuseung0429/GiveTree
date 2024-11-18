package com.dareuda.givetree.notification.controller.dto.response;

import com.dareuda.givetree.notification.domain.Notification;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ReadNotificationResponse {

    private String title;

    private String body;

    private LocalDateTime createdDateTime;

    public static ReadNotificationResponse from(Notification notification) {
       return new ReadNotificationResponse(
               notification.getTitle(),
               notification.getBody(),
               notification.getCreatedDateTIme()
       );
    }
}
