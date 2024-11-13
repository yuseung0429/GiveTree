package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.token.infrastructure.TokenTransferAllowanceContractRegistrar;
import com.dareuda.givetree.wallet.domain.WalletVO;
import com.dareuda.givetree.wallet.domain.campaign.CampaignWallet;
import com.dareuda.givetree.wallet.domain.campaign.CampaignWalletReader;
import com.dareuda.givetree.wallet.domain.member.MemberWallet;
import com.dareuda.givetree.wallet.domain.member.MemberWalletReader;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class CampaignContractCreator {

    private final CampaignDeployer campaignDeployer;
    private final TokenTransferAllowanceContractRegistrar tokenTransferAllowanceContractRegistrar;
    private final MemberWalletReader memberWalletReader;
    private final CampaignWalletReader campaignWalletReader;

    public CampaignContractCreator(
            CampaignDeployer campaignDeployer,
            MemberWalletReader memberWalletReader,
            TokenTransferAllowanceContractRegistrar tokenTransferAllowanceContractRegistrar,
            CampaignWalletReader campaignWalletReader
    ) {
        this.campaignDeployer = campaignDeployer;
        this.tokenTransferAllowanceContractRegistrar = tokenTransferAllowanceContractRegistrar;
        this.memberWalletReader = memberWalletReader;
        this.campaignWalletReader = campaignWalletReader;
    }

    public String create(long foundationId, long campaignId, LocalDateTime endDateTime) {
        MemberWallet foundationWallet = memberWalletReader.readByMemberId(foundationId);
        CampaignWallet campaignWallet = campaignWalletReader.readByCampaignId(campaignId);

        String contractAddress = campaignDeployer.deploy(WalletVO.from(foundationWallet), WalletVO.from(campaignWallet), endDateTime);
        tokenTransferAllowanceContractRegistrar.register(contractAddress);

        return contractAddress;
    }
}
