package com.dareuda.givetree.notification.domain;

import com.dareuda.givetree.notification.infrastructure.FcmCaller;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Not;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class FcmMessageSender {

    private final MemberFcmTokenReader memberFcmTokenReader;
    private final FcmCaller fcmCaller;

    public void send(long memberId, String title, String body) {
        MemberFcmToken memberFcmToken = memberFcmTokenReader.read(memberId);
        String jsonFcmMessage = FcmMessageWriter.write(memberFcmToken.getToken(), Notification.of(title, body));
        fcmCaller.call(jsonFcmMessage);
    }

    public void sendTest(String token, Notification notification) {
        String jsonFcmMessage = FcmMessageWriter.write(token, notification);
        fcmCaller.call(jsonFcmMessage);
    }
}
