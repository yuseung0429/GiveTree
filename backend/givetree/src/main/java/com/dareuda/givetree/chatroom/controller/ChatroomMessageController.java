package com.dareuda.givetree.chatroom.controller;

import com.dareuda.givetree.chatroom.domain.ChatroomHistoryAppender;
import com.dareuda.givetree.chatroom.domain.dto.ChatroomMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class ChatroomMessageController {
    private final ChatroomHistoryAppender chatroomHistoryAppender;

    @MessageMapping("/chatroom/{chatroomId}")
    @SendTo("/topic/chatroom/{chatroomId}")
    public ChatroomMessage handleChatroomMessage(
            @DestinationVariable("chatroomId") long chatroomId,
            ChatroomMessage message
    ) {
        chatroomHistoryAppender.append(chatroomId, message.getSenderId(), message.getContent());

        return new ChatroomMessage(message.getSenderId(), message.getContent(), LocalDateTime.now());
    }
}
