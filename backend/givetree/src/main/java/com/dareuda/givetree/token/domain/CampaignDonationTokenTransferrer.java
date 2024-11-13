package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.campaign.domain.Campaign;
import com.dareuda.givetree.campaign.domain.CampaignDeployer;
import com.dareuda.givetree.campaign.domain.CampaignDonor;
import com.dareuda.givetree.campaign.domain.CampaignReader;
import com.dareuda.givetree.finance.domain.MemberFinanceValidator;
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
    private final MemberFinanceValidator memberFinanceValidator;
    private final MemberWalletReader memberWalletReader;
    private final TokenCharger tokenCharger;
    private final CampaignDonor campaignDonor;
    private final CampaignWalletReader campaignWalletReader;
    private final CampaignReader campaignReader;

    public long transfer(long userId, long campaignId, long amount, String simplePassword, String message) {
        memberValidator.validateUser(userId);

        memberFinanceValidator.validateSimplePassword(userId, simplePassword);

        Campaign campaign = campaignReader.read(campaignId);

        MemberWallet userWallet = memberWalletReader.readByMemberId(userId);
        CampaignWallet campaignWallet = campaignWalletReader.readByCampaignId(campaignId);

        tokenCharger.charge(userId, amount, message);

        TransactionReceipt receipt = campaignDonor.donate(
                WalletVO.from(userWallet),
                WalletVO.from(campaignWallet),
                campaign.getContractAddress(),
                amount
        );
        return campaignDonor.saveTransaction(
                userWallet.getId(),
                campaignWallet.getId(),
                amount,
                TransactionType.CAMPAIGN_DONATION,
                receipt
        ).getId();
    }
}
