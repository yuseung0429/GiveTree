package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.campaign.domain.Campaign;
import com.dareuda.givetree.campaign.domain.CampaignContractDonor;
import com.dareuda.givetree.campaign.domain.CampaignReader;
import com.dareuda.givetree.donation.domain.CampaignDonationAppender;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.history.domain.TransactionType;
import com.dareuda.givetree.member.domain.MemberValidator;
import com.dareuda.givetree.wallet.domain.WalletVO;
import com.dareuda.givetree.wallet.domain.campaign.CampaignWallet;
import com.dareuda.givetree.wallet.domain.campaign.CampaignWalletReader;
import com.dareuda.givetree.wallet.domain.member.MemberWallet;
import com.dareuda.givetree.wallet.domain.member.MemberWalletReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

@Component
@RequiredArgsConstructor
public class CampaignDonationTokenTransferrer {

    private final MemberValidator memberValidator;
    private final MemberWalletReader memberWalletReader;
    private final CampaignContractDonor campaignContractDonor;
    private final CampaignWalletReader campaignWalletReader;
    private final CampaignReader campaignReader;
    private final CampaignDonationAppender campaignDonationAppender;

    public void transfer(long userId, long campaignId, long amount, String shareMessage) {
        memberValidator.validateUser(userId);

        Campaign campaign = campaignReader.read(campaignId);

        MemberWallet userWallet = memberWalletReader.readByMemberId(userId);
        CampaignWallet campaignWallet = campaignWalletReader.readByCampaignId(campaignId);

        TransactionReceipt receipt = campaignContractDonor.donate(
                WalletVO.from(userWallet),
                WalletVO.from(campaignWallet),
                campaign.getContractAddress(),
                amount
        );

        Transaction transaction = campaignContractDonor.saveTransaction(
                userWallet.getId(),
                campaignWallet.getId(),
                amount,
                TransactionType.CAMPAIGN_DONATION,
                receipt
        );

        campaignDonationAppender.append(
                userId,
                campaignId,
                amount,
                transaction.getId(),
                shareMessage
        );
    }
}
