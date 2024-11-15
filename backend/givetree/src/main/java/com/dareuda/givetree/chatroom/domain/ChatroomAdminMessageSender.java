package com.dareuda.givetree.chatroom.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatroomAdminMessageSender {
    private final SimpMessagingTemplate template;
    private final ChatroomHistoryAppender chatroomHistoryAppender;

    public void send(long chatroomId, String message) {
        String destination = "/topic/chatroom/" + chatroomId;
        chatroomHistoryAppender.append(chatroomId, 0L, message);
        template.convertAndSend(destination, message);
    }
}
