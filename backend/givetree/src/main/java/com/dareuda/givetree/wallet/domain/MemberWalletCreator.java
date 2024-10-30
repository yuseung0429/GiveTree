package com.dareuda.givetree.wallet.domain;

import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import com.dareuda.givetree.wallet.infrastructure.MemberWalletRepository;
import com.dareuda.givetree.wallet.infrastructure.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberWalletCreator {

    private final MemberReader memberReader;
    private final WalletKeyPairGenerator walletKeyPairGenerator;
    private final WalletRepository walletRepository;

    public void create(long memberId) {
        WalletKeyPair walletKeyPair = walletKeyPairGenerator.generate();
        Member member = memberReader.read(memberId);
        MemberWallet wallet = MemberWallet.builder()
                .member(member)
                .address(walletKeyPair.getAddress())
                .privateKey(walletKeyPair.getPrivateKey())
                .build();
        walletRepository.save(wallet);
    }
}