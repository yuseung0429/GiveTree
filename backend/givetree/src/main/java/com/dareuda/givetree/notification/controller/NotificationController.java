package com.dareuda.givetree.notification.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.notification.controller.dto.request.SendNotificationRequest;
import com.dareuda.givetree.notification.controller.dto.request.UpsertFcmTokenRequest;
import com.dareuda.givetree.notification.service.NotificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/notifications")
@RestController
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/send")
    public ResponseEntity<Void> sendNotification(
            @RequestBody SendNotificationRequest request
    ) {
        notificationService.sendNotification(request.getToken(), request.toNotification());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/token")
    public ResponseEntity<Void> upsertFcmToken(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @RequestBody @Valid UpsertFcmTokenRequest request
    ) {
        notificationService.upsertFcmToken(userPrinciple.getId(), request.getToken());
        return ResponseEntity.ok().build();
    }
}
