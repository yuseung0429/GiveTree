package com.dareuda.givetree.notification.domain;

import com.dareuda.givetree.notification.infrastructure.FcmCaller;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class FcmMessageSender {

    private final MemberFcmTokenReader memberFcmTokenReader;
    private final FcmCaller fcmCaller;
    private final NotificationAppender notificationAppender;

    public void send(long memberId, String title, String body) {
        MemberFcmToken memberFcmToken = memberFcmTokenReader.read(memberId);
        String jsonFcmMessage = FcmMessageWriter.write(memberFcmToken.getToken(), FcmMessageData.of(title, body));
        fcmCaller.call(jsonFcmMessage);
        notificationAppender.append(memberId, title, body);
    }

    public void sendTest(long memberId, String token, FcmMessageData fcmMessageData) {
        if (token == null) {
            token = memberFcmTokenReader.read(memberId).getToken();
        }

        String jsonFcmMessage = FcmMessageWriter.write(token, fcmMessageData);
        fcmCaller.call(jsonFcmMessage);
        notificationAppender.append(memberId, fcmMessageData.getTitle(), fcmMessageData.getBody());
    }
}
