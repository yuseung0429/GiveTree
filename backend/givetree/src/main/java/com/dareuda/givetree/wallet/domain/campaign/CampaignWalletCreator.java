package com.dareuda.givetree.wallet.domain.campaign;

import com.dareuda.givetree.campaign.domain.Campaign;
import com.dareuda.givetree.campaign.domain.CampaignReader;
import com.dareuda.givetree.wallet.domain.WalletKeyPair;
import com.dareuda.givetree.wallet.domain.WalletKeyPairGenerator;
import com.dareuda.givetree.wallet.infrastructure.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CampaignWalletCreator {

    private final CampaignReader campaignReader;
    private final WalletKeyPairGenerator walletKeyPairGenerator;
    private final WalletRepository walletRepository;

    public void create(long campaignId) {
        WalletKeyPair walletKeyPair = walletKeyPairGenerator.generate();
        Campaign campaign = campaignReader.read(campaignId);
        CampaignWallet wallet = CampaignWallet.builder()
                .campaign(campaign)
                .address(walletKeyPair.getAddress())
                .privateKey(walletKeyPair.getPrivateKey())
                .build();
        walletRepository.save(wallet);
    }
}