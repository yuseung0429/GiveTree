package com.dareuda.givetree.chatroom.service;

import com.dareuda.givetree.chatroom.domain.*;
import com.dareuda.givetree.chatroom.domain.dto.ChatroomDetail;
import com.dareuda.givetree.member.domain.dto.MemberDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatroomService {
    private final ChatroomConnector chatroomConnector;
    private final ChatroomDetailReader chatroomDetailReader;
    private final ChatroomHistoryDetailReader chatroomHistoryDetailReader;
    private final ChatroomConnectionReader chatroomConnectionReader;

    public long connect(long memberId, long saleId) {
        return chatroomConnector.connect(memberId, saleId);
    }

    public List<ChatroomDetail> getChatroomDetails(long memberId) {
        return chatroomDetailReader.readByMember(memberId);
    }

    public List<ChatroomHistoryDetail> getChatroomHistories(long memberId, long chatroomId) {
        // TODO: validate Authority

        return chatroomHistoryDetailReader.readByChatroom(chatroomId);
    }

    public MemberDetail getChatroomCounterpartMemberDetail(long memberId, long chatroomId) {
        return chatroomConnectionReader.readCounterpartMemberDetail(memberId, chatroomId);
    }
}
