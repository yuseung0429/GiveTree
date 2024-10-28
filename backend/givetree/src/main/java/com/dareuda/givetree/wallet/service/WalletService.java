package com.dareuda.givetree.wallet.service;

import com.dareuda.givetree.wallet.domain.WalletCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WalletService {

    private WalletCreator walletCreator;

    public void createWallet(long memberId) {
        walletCreator.create(memberId);
    }
}
