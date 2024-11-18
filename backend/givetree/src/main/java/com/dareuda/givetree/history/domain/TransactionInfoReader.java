package com.dareuda.givetree.history.domain;

import com.dareuda.givetree.wallet.domain.campaign.CampaignWallet;
import com.dareuda.givetree.wallet.domain.member.MemberWallet;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TransactionInfoReader {
    private final TransactionReader transactionReader;

    public Slice<TransactionInfo> readUnreceivedFoundationDonation(long receiverWalletId, Pageable pageable) {
        Slice<Transaction> transactions = transactionReader.readUnreceivedFoundationDonation(receiverWalletId, pageable);
        return transactions.map(element -> TransactionInfo.builder()
                .id(element.getId())
                .amount(element.getAmount())
                .createdAt(element.getCreatedAt())
                .name(((MemberWallet)element.getSenderWallet()).getMember().getName())
                .build()
        );
    }

    public Slice<TransactionInfo> readUnreceivedCampaignDonation(long receiverWalletId, Pageable pageable) {
        Slice<Transaction> transactions = transactionReader.readUnreceivedCampaignDonation(receiverWalletId, pageable);
        return transactions.map(element -> TransactionInfo.builder()
                .id(element.getId())
                .amount(element.getAmount())
                .createdAt(element.getCreatedAt())
                .name(((CampaignWallet)element.getSenderWallet()).getCampaign().getName())
                .build()
        );
    }
}
