package com.dareuda.givetree.chatroom.infrastructure;

import com.dareuda.givetree.chatroom.domain.Chatroom;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface ChatroomRepository extends Repository<Chatroom, Long> {
    Chatroom save(Chatroom chatroom);
    Optional<Chatroom> findById(Long id);
}
