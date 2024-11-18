package com.dareuda.givetree.chatroom.domain;

import com.dareuda.givetree.chatroom.infrastructure.ChatroomRepository;
import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ChatroomReader {
    private final ChatroomRepository chatroomRepository;
    private final ChatroomConnectionReader chatroomConnectionReader;

    @Transactional(readOnly = true)
    public Chatroom read(long chatroomId) {
        return chatroomRepository.findById(chatroomId)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND, "채팅방을 찾을 수 없습니다."));
    }

    @Transactional(readOnly = true)
    public List<Chatroom> readByMember(long memberId) {
        return chatroomConnectionReader.readByMember(memberId).stream()
                .map(ChatroomConnection::getChatroom)
                .toList();
    }
}
