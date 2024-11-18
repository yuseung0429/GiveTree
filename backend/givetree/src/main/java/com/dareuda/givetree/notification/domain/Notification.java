package com.dareuda.givetree.notification.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Notification {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @NotNull
    private Long memberId;

    @NotNull
    private String title;

    @NotNull
    private String body;

    @NotNull
    private LocalDateTime createdDateTIme;

    @Builder
    private Notification(long memberId, String title, String body, LocalDateTime createdDateTIme) {
        this.memberId = memberId;
        this.title = title;
        this.body = body;
        this.createdDateTIme = createdDateTIme;
    }
}
