package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.finance.domain.MemberFinanceValidator;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoundationDonor {
    private final static String MESSAGE = "%s 재단 후원";

    private final MemberReader memberReader;
    private final FoundationDonationTransferrer foundationDonationTransferrer;
    private final MemberFinanceValidator memberFinanceValidator;

    public void donateOneTime(long userId, long foundationId, long amount, String simplePassword) {
        Member foundation = memberReader.read(foundationId);
        String message = String.format(MESSAGE, foundation.getName());
        memberFinanceValidator.validateSimplePassword(userId, simplePassword);
        foundationDonationTransferrer.transfer(
                userId,
                foundationId,
                amount,
                message,
                FoundationDonationType.ONE_TIME
        );
    }

    public void donateRegular(long userId, long foundationId, long amount) {
        Member foundation = memberReader.read(foundationId);
        String message = String.format(MESSAGE, foundation.getName());
        foundationDonationTransferrer.transfer(
                userId,
                foundationId,
                amount,
                message,
                FoundationDonationType.REGULAR
        );
    }
}
