package com.dareuda.givetree.chatroom.domain;

import com.dareuda.givetree.chatroom.infrastructure.ChatroomHistoryRepository;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ChatroomHistoryAppender {
    private final MemberReader memberReader;
    private final ChatroomReader chatroomReader;
    private final ChatroomHistoryRepository chatroomHistoryRepository;

    @Transactional
    public void append(long chatroomId, long memberId, String message) {
        Chatroom chatroom = chatroomReader.read(chatroomId);
        Member member = memberReader.read(memberId);

        chatroomHistoryRepository.save(new ChatroomHistory(chatroom, member, message));
    }
}
