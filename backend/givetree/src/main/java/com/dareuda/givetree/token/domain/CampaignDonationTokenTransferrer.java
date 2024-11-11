package com.dareuda.givetree.token.domain;

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

    private final TokenTransferrer tokenTransferrer;
    private final MemberWalletReader memberWalletReader;
    private final CampaignWalletReader campaignWalletReader;
    private final MemberFinanceValidator memberFinanceValidator;
    private final MemberValidator memberValidator;

    public void transfer(long memberId, long campaignId, long amount, String simplePassword) {
        memberValidator.validateUser(memberId);

        MemberWallet memberWallet = memberWalletReader.readByMemberId(memberId);
        CampaignWallet campaignWallet = campaignWalletReader.readByCampaignId(campaignId);

        memberFinanceValidator.validateSimplePassword(memberId, simplePassword);

        TransactionReceipt receipt = tokenTransferrer.transfer(WalletVO.from(memberWallet), WalletVO.from(campaignWallet), amount);
        tokenTransferrer.saveTransaction(
                memberWallet.getId(),
                campaignWallet.getId(),
                amount,
                TransactionType.CAMPAIGN_DONATION,
                receipt
        );
    }
}
