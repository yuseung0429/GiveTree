package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.campaign.domain.Campaign;
import com.dareuda.givetree.campaign.domain.CampaignReader;
import com.dareuda.givetree.donation.infrastructure.CampaignDonationRepository;
import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.history.domain.TransactionReader;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
@RequiredArgsConstructor
public class CampaignDonationAppender {

    private final CampaignDonationRepository campaignDonationRepository;
    private final MemberReader memberReader;
    private final CampaignReader foundationReader;
    private final TransactionReader transactionReader;

    public void append(long userId, long campaignId, long amount, long transactionId, String message) {
        Member donor = memberReader.read(userId);
        Campaign campaign = foundationReader.read(campaignId);
        Transaction transaction = transactionReader.read(transactionId);

        campaignDonationRepository.save(
                CampaignDonation.builder()
                        .donor(donor)
                        .campaign(campaign)
                        .amount(amount)
                        .transaction(transaction)
                        .message(message)
                        .build()
        );
    }
}