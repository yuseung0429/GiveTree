package com.dareuda.givetree.chatroom.domain.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ChatroomDetail {
    @NonNull
    private final Long id;
    @NonNull
    private final Long saleId;
    @NonNull
    private final String saleTitle;
    @NonNull
    private final Long counterpartId;
    @NonNull
    private final String counterpartName;
    private final String counterpartProfileImageUrl;
    private final String lastMessage;
    private final LocalDateTime lastMessageCreatedAt;
}
