package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import com.dareuda.givetree.token.domain.FoundationDonationTokenTransferrer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoundationDonor {
    private final static String MESSAGE = "%s 재단 후원";

    private final MemberReader memberReader;
    private final FoundationDonationTokenTransferrer foundationDonationTokenTransferrer;
    private final FoundationDonationAppender foundationDonationAppender;

    public void donate(long userId, long foundationId, long amount, String simplePassword) {
        Member foundation = memberReader.read(foundationId);
        String message = String.format(MESSAGE, foundation.getName());
        long transactionId = foundationDonationTokenTransferrer.transfer(
                userId,
                foundationId,
                amount,
                simplePassword,
                message
        );
        foundationDonationAppender.append(userId, foundationId, amount, transactionId, FoundationDonationType.ONE_TIME);
    }

    public void donate(long userId, long foundationId, long amount) {
        Member foundation = memberReader.read(foundationId);
        String message = String.format(MESSAGE, foundation.getName());
        long transactionId = foundationDonationTokenTransferrer.transfer(
                userId,
                foundationId,
                amount,
                message
        );
        foundationDonationAppender.append(userId, foundationId, amount, transactionId, FoundationDonationType.REGULAR);
    }
}
