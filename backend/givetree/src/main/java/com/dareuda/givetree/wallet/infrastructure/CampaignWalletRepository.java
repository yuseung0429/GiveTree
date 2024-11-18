package com.dareuda.givetree.wallet.infrastructure;

import com.dareuda.givetree.wallet.domain.campaign.CampaignWallet;

import java.util.Optional;

public interface CampaignWalletRepository extends BaseWalletRepository<CampaignWallet> {
    Optional<CampaignWallet> findByCampaignId(long campaignId);
}