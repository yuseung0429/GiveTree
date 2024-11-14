package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.donation.domain.dto.DonateToFoundationCommand;
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
    public void donate(DonateToFoundationCommand command) {
        memberFinanceValidator.validateSimplePassword(command.getMemberId(), command.getSimplePassword());

        Member member = memberReader.read(command.getMemberId());
        Foundation foundation = foundationReader.read(command.getFoundationId());

        regularDonationRepository.save(
                DonationSubscription.builder()
                        .member(member)
                        .foundation(foundation)
                        .amount(command.getAmount())
                        .build()
        );
    }
}
