package com.dareuda.givetree.chatroom.controller.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
public class ConnectChatroomRequest {
    private Long saleId;
}
