package com.dareuda.givetree.notification.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Notification {

    private String title;

    private String body;

    private String image;

    public static Notification of(String title, String body) {
        return Notification.builder()
                .title(title)
                .body(body)
                .build();
    }
}
