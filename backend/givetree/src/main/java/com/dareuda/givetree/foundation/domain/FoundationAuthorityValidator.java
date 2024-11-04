package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class FoundationAuthorityValidator {
    private final FoundationReader foundationReader;

    @Transactional(readOnly = true)
    public void validateModifyAuthority(long memberId, long foundationId) {
        long foundationOwnerId = foundationReader.read(foundationId).getId();

        if (memberId != foundationOwnerId) {
            throw new RestApiException(CommonErrorCode.FORBIDDEN, "재단 변경 권한이 없습니다.");
        }
    }
}
