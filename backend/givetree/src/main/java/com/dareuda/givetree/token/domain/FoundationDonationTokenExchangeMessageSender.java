package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.notification.domain.FcmMessageSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoundationDonationTokenExchangeMessageSender {
    private final static String TITLE = "재단 후원 환전 알림";
    private final static String BODY_TEMPLATE = "총 %d원 환전 완료되었습니다.";

    private final FcmMessageSender fcmMessageSender;

    public void send(long foundationId, long amount) {
        String body = String.format(BODY_TEMPLATE, amount);
        fcmMessageSender.send(foundationId, TITLE, body);
    }
}
