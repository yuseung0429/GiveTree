package com.dareuda.givetree.chatroom.domain;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ChatroomMessage {
    private final Long senderId;
    @NonNull
    private final String content;
}
