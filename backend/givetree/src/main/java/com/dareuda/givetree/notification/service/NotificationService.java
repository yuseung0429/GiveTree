package com.dareuda.givetree.notification.service;

import com.dareuda.givetree.notification.domain.FcmMessageSender;
import com.dareuda.givetree.notification.domain.MemberFcmTokenManager;
import com.dareuda.givetree.notification.domain.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class NotificationService {

    private final MemberFcmTokenManager memberFcmTokenManager;
    private final FcmMessageSender fcmMessageSender;

    public void sendNotification(String token, Notification notification) {
        fcmMessageSender.sendTest(token, notification);
    }

    public void upsertFcmToken(long memberId, String fcmDeviceToken) {
        memberFcmTokenManager.upsertFcmToken(memberId, fcmDeviceToken);
    }
}
