package com.dareuda.givetree.chatroom.domain;

import com.dareuda.givetree.chatroom.infrastructure.ChatroomHistoryRepository;
import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ChatroomHistoryReader {
    private final ChatroomHistoryRepository chatroomHistoryRepository;

    @Transactional(readOnly = true)
    public ChatroomHistory read(long chatroomHistoryId) {
        return chatroomHistoryRepository.findById(chatroomHistoryId)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND, "대화 기록을 찾을 수 없습니다."));
    }

    @Transactional(readOnly = true)
    public List<ChatroomHistory> readByChatroom(long chatroomId) {
        return chatroomHistoryRepository.findAllByChatroomId(chatroomId);
    }

    @Transactional(readOnly = true)
    public ChatroomHistory readLastHistoryByChatroom(long chatroomId) {
        return chatroomHistoryRepository.findTopByChatroomIdOrderByIdDesc(chatroomId)
                .orElse(null);
    }
}
