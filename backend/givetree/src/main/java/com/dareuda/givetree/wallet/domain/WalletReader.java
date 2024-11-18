package com.dareuda.givetree.wallet.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.wallet.controller.WalletErrorCode;
import com.dareuda.givetree.wallet.infrastructure.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WalletReader {

    private final WalletRepository walletRepository;

    public Wallet read(long walletId) {
        return walletRepository.findById(walletId)
                .orElseThrow(() -> new RestApiException(WalletErrorCode.WALLET_NOT_FOUND));
    }
}
