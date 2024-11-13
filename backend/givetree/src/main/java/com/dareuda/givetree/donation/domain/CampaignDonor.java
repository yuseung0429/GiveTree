package com.dareuda.givetree.donation.domain;

import com.dareuda.givetree.campaign.domain.Campaign;
import com.dareuda.givetree.campaign.domain.CampaignReader;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.donation.infrastructure.DonationRepository;
import com.dareuda.givetree.history.controller.TransactionErrorCode;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.history.infrastructure.TransactionRepository;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import com.dareuda.givetree.token.domain.CampaignDonationTokenTransferrer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CampaignDonor {
    private final CampaignDonationTokenTransferrer campaignDonationTokenTransferrer;
    private final DonationRepository donationRepository;
    private final TransactionRepository transactionRepository;
    private final MemberReader memberReader;
    private final CampaignReader campaignReader;

    public void donate(long memberId, long campaignId, long amount, String message, String simplePassword) {
        long transactionId = campaignDonationTokenTransferrer.transfer(memberId, campaignId, amount, simplePassword, message);

        Member donorReference = memberReader.readReference(memberId);
        Transaction transactionReference = transactionRepository.getReferenceById(transactionId)
                .orElseThrow(() -> new RestApiException(TransactionErrorCode.TRANSACTION_NOT_FOUND));
        Campaign campaignReference = campaignReader.readReference(campaignId);

        donationRepository.save(
                CampaignDonation.builder()
                        .donor(donorReference)
                        .transaction(transactionReference)
                        .amount(amount)
                        .campaign(campaignReference)
                        .message(message)
                        .build()
        );
    }
}
