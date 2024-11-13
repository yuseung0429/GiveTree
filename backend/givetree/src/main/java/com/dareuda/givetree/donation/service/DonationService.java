package com.dareuda.givetree.donation.service;

import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.donation.domain.CampaignDonor;
import com.dareuda.givetree.donation.domain.DonationOption;
import com.dareuda.givetree.donation.domain.FoundationRegularDonor;
import com.dareuda.givetree.donation.domain.FoundationOneTimeDonor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DonationService {
    private final FoundationOneTimeDonor foundationOneTimeDonor;
    private final FoundationRegularDonor foundationRegularDonor;
    private final CampaignDonor campaignDonor;

    public void donateToFoundation(long memberId, long foundationId, long amount, String simplePassword, DonationOption option) {
        switch (option) {
            case ONE_TIME_DONATION -> foundationOneTimeDonor.donate(memberId, foundationId, amount, simplePassword);
            case REGULAR_DONATION -> foundationRegularDonor.donate(memberId, foundationId, amount, simplePassword);
            default -> throw new RestApiException(CommonErrorCode.BAD_REQUEST, "기부 옵션을 찾을 수 없습니다.");
        }
    }

    public void donateToCampaign(long memberId, long campaignId, long amount, String message, String simplePassword) {
        campaignDonor.donate(memberId, campaignId, amount, message, simplePassword);
    }
}
