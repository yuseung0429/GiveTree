package com.dareuda.givetree.notification.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.notification.controller.NotificationErrorCode;
import com.dareuda.givetree.notification.infrastructure.MemberFcmTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class MemberFcmTokenReader {

    private final MemberFcmTokenRepository memberFcmTokenRepository;

    public MemberFcmToken read(long memberId) {
        return memberFcmTokenRepository.findByMemberId(memberId)
                .orElseThrow(() -> new RestApiException(NotificationErrorCode.TOKEN_NOT_FOUND));
    }
}
