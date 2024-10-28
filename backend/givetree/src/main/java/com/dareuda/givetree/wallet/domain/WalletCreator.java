package com.dareuda.givetree.wallet.domain;

import com.dareuda.givetree.member.infrastructure.MemberRepository;
import com.dareuda.givetree.wallet.infrastructure.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WalletCreator {

    private final WalletGenerator walletGenerator;
    private final WalletRepository walletRepository;
    private final MemberRepository memberRepository;

    public void create(long memberId) {
        GeneratedWallet generatedWallet = walletGenerator.generate();
        Wallet wallet = Wallet.builder()
                .member(memberRepository.getReferenceById(memberId))
                .address(generatedWallet.getAddress())
                .privateKey(generatedWallet.getPrivateKey())
                .build();
        walletRepository.save(wallet);
    }
}
