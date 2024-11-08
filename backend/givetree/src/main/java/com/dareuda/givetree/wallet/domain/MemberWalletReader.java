package com.dareuda.givetree.wallet.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.wallet.controller.WalletErrorCode;
import com.dareuda.givetree.wallet.infrastructure.MemberWalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberWalletReader {
    private final MemberWalletRepository memberWalletRepository;

    public MemberWallet readByMemberId(long memberId) {
        return memberWalletRepository.findByMemberId(memberId)
                .orElseThrow(() -> new RestApiException(WalletErrorCode.WALLET_NOT_FOUND));
    }
}
