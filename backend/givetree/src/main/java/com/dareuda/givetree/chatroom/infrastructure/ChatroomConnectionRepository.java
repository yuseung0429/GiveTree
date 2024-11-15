package com.dareuda.givetree.chatroom.infrastructure;

import com.dareuda.givetree.chatroom.domain.ChatroomConnection;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface ChatroomConnectionRepository extends Repository<ChatroomConnection, Long> {
    ChatroomConnection save(ChatroomConnection chatroomConnection);
    Optional<ChatroomConnection> findByMemberIdAndChatroomSaleId(long memberId, long chatroomSaleId);
    List<ChatroomConnection> findByMemberId(long memberId);
    Optional<ChatroomConnection> findFirstByMemberIdNotAndChatroomId(long memberId, long chatroomId);
}
