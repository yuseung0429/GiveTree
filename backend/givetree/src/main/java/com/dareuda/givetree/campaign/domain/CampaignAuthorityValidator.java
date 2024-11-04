package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class CampaignAuthorityValidator {
    private final CampaignReader campaignReader;

    @Transactional(readOnly = true)
    public void validateModifyAuthority(long memberId, long campaignId) {
        long campaignFoundationOwnerId = campaignReader.read(campaignId).getFoundation().getId();

        if (memberId != campaignFoundationOwnerId) {
            throw new RestApiException(CommonErrorCode.FORBIDDEN, "캠페인 변경 권한이 없습니다.");
        }
    }
}
