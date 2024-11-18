package com.dareuda.givetree.notification.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.notification.controller.dto.NotificationDtoConverter;
import com.dareuda.givetree.notification.controller.dto.request.SendNotificationRequest;
import com.dareuda.givetree.notification.controller.dto.request.UpsertFcmTokenRequest;
import com.dareuda.givetree.notification.controller.dto.response.ReadNotificationResponse;
import com.dareuda.givetree.notification.domain.Notification;
import com.dareuda.givetree.notification.service.NotificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/notifications")
@RestController
public class NotificationController {

    private final NotificationService notificationService;

    /*
    * 개발용
    * */
    @PostMapping("/send")
    public ResponseEntity<Void> sendNotification(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @RequestBody SendNotificationRequest request
    ) {
        notificationService.sendNotification(userPrinciple.getId(), request.getToken(), request.toNotification());
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<ReadNotificationResponse>> readNotifications(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @PageableDefault Pageable pageable
    ) {
        List<Notification> result = notificationService.readNotifications(userPrinciple.getId(), pageable);
        return ResponseEntity.ok().body(NotificationDtoConverter.convert(result));
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
