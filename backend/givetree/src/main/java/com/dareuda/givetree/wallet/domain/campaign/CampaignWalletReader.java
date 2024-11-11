package com.dareuda.givetree.wallet.domain.campaign;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.wallet.controller.WalletErrorCode;
import com.dareuda.givetree.wallet.domain.member.MemberWallet;
import com.dareuda.givetree.wallet.infrastructure.CampaignWalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CampaignWalletReader {

    private final CampaignWalletRepository campaignWalletRepository;

    public CampaignWallet readByCampaignId(long campaignId) {
        return campaignWalletRepository.findByCampaignId(campaignId)
                .orElseThrow(() -> new RestApiException(WalletErrorCode.WALLET_NOT_FOUND));
    }
}