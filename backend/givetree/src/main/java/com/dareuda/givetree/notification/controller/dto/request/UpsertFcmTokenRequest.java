package com.dareuda.givetree.notification.controller.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class UpsertFcmTokenRequest {

    @NotBlank
    private String token;
}
