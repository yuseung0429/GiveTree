package com.dareuda.givetree.chatroom.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.chatroom.domain.ChatroomHistoryAppender;
import com.dareuda.givetree.chatroom.domain.ChatroomMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatroomMessageController {
    private final ChatroomHistoryAppender chatroomHistoryAppender;

    @MessageMapping("/chatroom/{chatroomId}")
    @SendTo("/topic/chatroom/{chatroomId}")
    public ChatroomMessage handleChatroomMessage(
            @DestinationVariable long chatroomId,
            ChatroomMessage message,
            @AuthenticationPrincipal UserPrinciple userPrinciple
    ) {
        long senderId = userPrinciple.getId();
        chatroomHistoryAppender.append(chatroomId, senderId, message.getContent());

        return message;
    }
}
