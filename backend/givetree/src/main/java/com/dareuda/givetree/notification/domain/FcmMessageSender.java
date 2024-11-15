package com.dareuda.givetree.notification.domain;

import com.dareuda.givetree.notification.infrastructure.FcmCaller;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class FcmMessageSender {

    private final MemberFcmTokenReader memberFcmTokenReader;
    private final FcmCaller fcmCaller;

    @Async
    public void send(long memberId, String title, String body) {
        MemberFcmToken memberFcmToken = memberFcmTokenReader.read(memberId);
        String jsonFcmMessage = FcmMessageWriter.write(memberFcmToken.getToken(), Notification.of(title, body));
        fcmCaller.call(jsonFcmMessage);
    }

    @Async
    public void sendTest(String token, Notification notification) {
        String jsonFcmMessage = FcmMessageWriter.write(token, notification);
        fcmCaller.call(jsonFcmMessage);
    }
}
