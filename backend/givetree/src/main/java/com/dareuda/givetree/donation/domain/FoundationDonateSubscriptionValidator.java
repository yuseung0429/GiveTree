package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.donation.controller.DonationErrorCode;
import com.dareuda.givetree.finance.domain.MemberFinanceValidator;
import com.dareuda.givetree.member.domain.MemberValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoundationDonateSubscriptionValidator {

    private final FoundationDonateSubscriptionReader foundationDonateSubscriptionReader;
    private final MemberValidator memberValidator;
    private final MemberFinanceValidator memberFinanceValidator;

    public void validateRegisterable(long userId, long foundationId, String simplePassword) {
        memberValidator.validateUser(userId);
        memberValidator.validateFoundation(foundationId);

        memberFinanceValidator.validateSimplePassword(userId, simplePassword);

        if (foundationDonateSubscriptionReader.existsFoundationDonateSubscription(userId, foundationId)) {
            throw new RestApiException(DonationErrorCode.FOUNDATION_DONATION_SUBSCRIPTION_ALREADY_EXISTS);
        }
    }
}
