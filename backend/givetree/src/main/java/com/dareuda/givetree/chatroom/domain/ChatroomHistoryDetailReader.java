package com.dareuda.givetree.chatroom.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ChatroomHistoryDetailReader {
    private final ChatroomHistoryReader chatroomHistoryReader;

    @Transactional(readOnly = true)
    public ChatroomHistoryDetail read(long chatroomHistoryId) {
        ChatroomHistory chatroomHistory = chatroomHistoryReader.read(chatroomHistoryId);

        return ChatroomHistoryDetail.builder()
                .id(chatroomHistory.getId())
                .chatroomId(chatroomHistory.getChatroom().getId())
                .senderId(chatroomHistory.getSender().getId())
                .message(chatroomHistory.getMessage())
                .createdAt(chatroomHistory.getCreatedAt())
                .build();
    }

    @Transactional(readOnly = true)
    public List<ChatroomHistoryDetail> readByChatroom(long chatroomId) {
        return chatroomHistoryReader.readByChatroom(chatroomId).stream()
                .map(history -> read(history.getId()))
                .toList();
    }
}
