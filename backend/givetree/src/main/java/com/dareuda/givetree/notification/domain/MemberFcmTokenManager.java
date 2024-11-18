package com.dareuda.givetree.notification.domain;

import com.dareuda.givetree.notification.infrastructure.MemberFcmTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class MemberFcmTokenManager {

    private final MemberFcmTokenRepository memberFcmTokenRepository;

    @Transactional
    public void upsertFcmToken(long memberId, String fcmToken) {
        Optional<MemberFcmToken> memberFcmToken = memberFcmTokenRepository.findByMemberId(memberId);
        if (memberFcmToken.isPresent()) {
            memberFcmToken.get().updateToken(fcmToken);
            return;
        }

        LocalDateTime now = LocalDateTime.now();
        memberFcmTokenRepository.save(MemberFcmToken.builder()
                .memberId(memberId)
                .token(fcmToken)
                .updatedDateTime(now)
                .createdDateTime(now)
                .build());
    }
}
