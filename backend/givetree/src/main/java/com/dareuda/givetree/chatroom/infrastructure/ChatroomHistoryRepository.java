package com.dareuda.givetree.chatroom.infrastructure;

import com.dareuda.givetree.chatroom.domain.ChatroomHistory;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface ChatroomHistoryRepository extends Repository<ChatroomHistory, Long> {
    ChatroomHistory save(ChatroomHistory chatroomHistory);
    Optional<ChatroomHistory> findById(Long id);
    Optional<ChatroomHistory> findTopByChatroomIdOrderByIdDesc(long chatroomId);
    List<ChatroomHistory> findAllByChatroomId(long chatroomId);
}
