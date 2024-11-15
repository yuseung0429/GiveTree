package com.dareuda.givetree.chatroom.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.chatroom.controller.dto.ConnectChatroomRequest;
import com.dareuda.givetree.chatroom.domain.ChatroomHistoryDetail;
import com.dareuda.givetree.chatroom.domain.dto.ChatroomDetail;
import com.dareuda.givetree.chatroom.service.ChatroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chatrooms")
@RequiredArgsConstructor
public class ChatroomController {
    private final ChatroomService chatroomService;

    @PostMapping("/connect")
    public ResponseEntity<Map<String, Object>> connect(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @RequestBody ConnectChatroomRequest request
    ) {
        long chatroomId = chatroomService.connect(userPrinciple.getId(), request.getSaleId());

        return ResponseEntity.ok(Map.of("chatroomId", chatroomId));
    }

    @GetMapping
    public ResponseEntity<List<ChatroomDetail>> getChatroomDetails(@AuthenticationPrincipal UserPrinciple userPrinciple) {
        List<ChatroomDetail> chatroomDetails = chatroomService.getChatroomDetails(userPrinciple.getId());

        return ResponseEntity.ok(chatroomDetails);
    }

    @GetMapping("/{chatroomId}/histories")
    public ResponseEntity<List<ChatroomHistoryDetail>> getChatHistories(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @PathVariable long chatroomId
    ) {
        List<ChatroomHistoryDetail> chatHistoryDetails = chatroomService.getChatroomHistories(userPrinciple.getId(), chatroomId);

        return ResponseEntity.ok(chatHistoryDetails);
    }
}
