package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.finance.domain.MemberFinanceValidator;
import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.foundation.domain.FoundationReader;
import com.dareuda.givetree.donation.infrastructure.RegularDonationRepository;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class FoundationRegularDonor {
    private final RegularDonationRepository regularDonationRepository;
    private final MemberReader memberReader;
    private final FoundationReader foundationReader;
    private final MemberFinanceValidator memberFinanceValidator;

    @Transactional
    public void donate(long memberId, long foundationId, long amount, String simplePassword) {
        memberFinanceValidator.validateSimplePassword(memberId, simplePassword);

        Member member = memberReader.read(memberId);
        Foundation foundation = foundationReader.read(foundationId);

        regularDonationRepository.save(
                DonationSubscription.builder()
                        .member(member)
                        .foundation(foundation)
                        .amount(amount)
                        .build()
        );
    }
}
