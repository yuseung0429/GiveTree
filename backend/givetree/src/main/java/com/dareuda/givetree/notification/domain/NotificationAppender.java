package com.dareuda.givetree.notification.domain;

import com.dareuda.givetree.notification.infrastructure.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Component
public class NotificationAppender {

    private final NotificationRepository notificationRepository;

    public void append(long memberId, String title, String body) {
        Notification notification = Notification.builder()
                .memberId(memberId)
                .title(title)
                .body(body)
                .createdDateTIme(LocalDateTime.now())
                .build();
        notificationRepository.save(notification);
    }
}
