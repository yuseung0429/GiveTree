package com.dareuda.givetree.notification.service;

import com.dareuda.givetree.notification.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NotificationService {

    private final MemberFcmTokenManager memberFcmTokenManager;
    private final NotificationReader notificationReader;
    private final FcmMessageSender fcmMessageSender;

    public void sendNotification(long memberId, String token, FcmMessageData fcmMessageData) {
        fcmMessageSender.sendTest(memberId, token, fcmMessageData);
    }

    public List<Notification> readNotifications(long memberId, Pageable pageable) {
        return notificationReader.read(memberId, pageable);
    }

    public void upsertFcmToken(long memberId, String fcmDeviceToken) {
        memberFcmTokenManager.upsertFcmToken(memberId, fcmDeviceToken);
    }
}
