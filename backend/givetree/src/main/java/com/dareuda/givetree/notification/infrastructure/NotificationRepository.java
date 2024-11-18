package com.dareuda.givetree.notification.infrastructure;


import com.dareuda.givetree.notification.domain.Notification;
import org.springframework.data.repository.Repository;

public interface NotificationRepository extends Repository<Notification, Long> {

    Notification save(Notification notification);
}
