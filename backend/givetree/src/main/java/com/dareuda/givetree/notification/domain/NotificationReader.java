package com.dareuda.givetree.notification.domain;

import com.dareuda.givetree.notification.infrastructure.NotificationQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class NotificationReader {

    private final NotificationQueryRepository notificationQueryRepository;

    public List<Notification> read(long memberId, Pageable pageable) {
        return notificationQueryRepository.findNotifications(memberId, pageable);
    }
}
