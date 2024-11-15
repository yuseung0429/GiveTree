package com.dareuda.givetree.notification.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class FcmMessage {

    private boolean validateOnly;

    private Message message;

    @AllArgsConstructor
    @Getter
    public static class Message {
        private String token;
        private Notification data;
    }
}
