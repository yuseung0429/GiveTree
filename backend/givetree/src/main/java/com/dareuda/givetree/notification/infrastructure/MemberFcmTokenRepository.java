package com.dareuda.givetree.notification.infrastructure;

import com.dareuda.givetree.notification.domain.MemberFcmToken;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface MemberFcmTokenRepository extends Repository<MemberFcmToken, Long> {

    Optional<MemberFcmToken> findByMemberId(long memberId);

    MemberFcmToken save(MemberFcmToken memberFcmToken);
}
