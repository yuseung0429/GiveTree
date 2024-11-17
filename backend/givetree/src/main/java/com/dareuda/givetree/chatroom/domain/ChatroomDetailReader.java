package com.dareuda.givetree.chatroom.domain;

import com.dareuda.givetree.chatroom.domain.dto.ChatroomDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ChatroomDetailReader {
    private final ChatroomReader chatroomReader;
    private final ChatroomHistoryReader chatroomHistoryReader;
    private final ChatroomConnectionReader chatroomConnectionReader;

    @Transactional(readOnly = true)
    public ChatroomDetail read(long chatroomId, long memberId) {
        Chatroom chatroom = chatroomReader.read(chatroomId);

        ChatroomHistory lastHistory = chatroomHistoryReader.readLastHistoryByChatroom(chatroomId);
        ChatroomConnection connection = chatroomConnectionReader.readCounterpartConnection(memberId, chatroomId);

        return ChatroomDetail.builder()
                .id(chatroom.getId())
                .saleId(chatroom.getSale().getId())
                .counterpartId(connection.getMember().getId())
                .lastMessage(lastHistory != null ? lastHistory.getMessage() : null)
                .lastMessageCreatedAt(lastHistory != null ? lastHistory.getCreatedAt() : null)
                .build();
    }

    @Transactional(readOnly = true)
    public List<ChatroomDetail> readByMember(long memberId) {
        return chatroomReader.readByMember(memberId).stream()
                .map(chatroom -> read(chatroom.getId(), memberId))
                .toList();
    }
}
