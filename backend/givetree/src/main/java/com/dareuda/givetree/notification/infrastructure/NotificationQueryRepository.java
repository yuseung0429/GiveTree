package com.dareuda.givetree.notification.infrastructure;

import com.dareuda.givetree.notification.domain.Notification;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.dareuda.givetree.notification.domain.QNotification.notification;

@Repository
public class NotificationQueryRepository {

    private final JPAQueryFactory query;

    public NotificationQueryRepository(EntityManager em) {
        query = new JPAQueryFactory(em);
    }

    public List<Notification> findNotifications(long memberId, Pageable pageable) {
        return query
                .select(notification)
                .from(notification)
                .where(notification.memberId.eq(memberId))
                .orderBy(notification.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }
}
