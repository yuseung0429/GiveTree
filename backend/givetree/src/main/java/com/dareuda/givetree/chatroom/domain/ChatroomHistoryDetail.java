package com.dareuda.givetree.chatroom.domain;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ChatroomHistoryDetail {
    @NonNull
    private final Long id;

    @NonNull
    private final Long chatroomId;

    @NonNull
    private final Long senderId;

    @NonNull
    private final String message;

    @NonNull
    private final LocalDateTime createdAt;
}
