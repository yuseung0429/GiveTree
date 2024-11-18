package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.donation.infrastructure.FoundationDonationRepository;
import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.foundation.domain.FoundationReader;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.history.domain.TransactionReader;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FoundationDonationAppender {

    private final FoundationDonationRepository foundationDonationRepository;
    private final MemberReader memberReader;
    private final FoundationReader foundationReader;
    private final TransactionReader transactionReader;

    public void append(long userId, long foundationId, long amount, long transactionId, FoundationDonationType donationType) {
        Member donor = memberReader.read(userId);
        Foundation foundation = foundationReader.read(foundationId);
        Transaction transaction = transactionReader.read(transactionId);

        foundationDonationRepository.save(
                FoundationDonation.builder()
                        .donor(donor)
                        .foundation(foundation)
                        .amount(amount)
                        .transaction(transaction)
                        .donationType(donationType)
                        .build()
        );
    }
}
