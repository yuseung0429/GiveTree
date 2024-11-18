package com.dareuda.givetree.chatroom.domain;

import com.dareuda.givetree.chatroom.domain.dto.ChatroomMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ChatroomAdminMessageSender {
    private final SimpMessagingTemplate template;
    private final ChatroomHistoryAppender chatroomHistoryAppender;

    public void send(long chatroomId, ChatroomMessage message) {
        log.info("Sending admin message to chatroom({})", chatroomId);

        String destination = "/topic/chatroom/" + chatroomId;
        chatroomHistoryAppender.append(chatroomId, 0L, message.getContent());
        template.convertAndSend(destination, message);
    }
}
