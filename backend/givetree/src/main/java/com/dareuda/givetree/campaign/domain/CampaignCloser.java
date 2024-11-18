package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.campaign.infrastructure.CampaignContract;
import com.dareuda.givetree.history.domain.TransactionType;
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
public class CampaignCloser {

    private final CampaignContractCloser campaignContractCloser;
    private final MemberWalletReader memberWalletReader;
    private final CampaignWalletReader campaignWalletReader;
    private final CampaignReader campaignReader;

    public void close(long foundationId, long campaignId) {
        MemberWallet foundationWallet = memberWalletReader.readByMemberId(foundationId);
        CampaignWallet campaignWallet = campaignWalletReader.readByCampaignId(campaignId);

        Campaign campaign = campaignReader.read(campaignId);

        TransactionReceipt receipt = campaignContractCloser.close(
                WalletVO.from(foundationWallet),
                WalletVO.from(campaignWallet),
                campaign.getContractAddress()
        );

        CampaignContract.CampaignClosedEventResponse response = CampaignContract.getCampaignClosedEventFromLog(receipt.getLogs().get(0));

        campaignContractCloser.saveTransaction(
                foundationWallet.getId(),
                campaignWallet.getId(),
                response.totalAmount.longValue(),
                TransactionType.FOUNDATION_DONATION,
                receipt
        );
    }
}
