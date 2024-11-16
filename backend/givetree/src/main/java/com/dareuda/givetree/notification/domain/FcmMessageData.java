package com.dareuda.givetree.notification.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class FcmMessageData {

    private String title;

    private String body;

    private String image;

    public static FcmMessageData of(String title, String body) {
        return FcmMessageData.builder()
                .title(title)
                .body(body)
                .build();
    }
}
