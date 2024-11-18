package com.dareuda.givetree.donation.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
public class FoundationDonationUserInfo {
    private final Long userId;
    private final String userImage;
    private final String userName;
    private final FoundationDonationType donationType;
    private final Long amount;
    private final String message;
    private final LocalDateTime createdAt;
}
