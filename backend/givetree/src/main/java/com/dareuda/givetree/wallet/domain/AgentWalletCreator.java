package com.dareuda.givetree.wallet.domain;

import com.dareuda.givetree.wallet.infrastructure.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class AgentWalletCreator {

    private final WalletKeyPairGenerator walletKeyPairGenerator;
    private final WalletRepository walletRepository;

    public void create() {
        walletRepository.save(createAgentWallet());
    }

    public void create(int count) {
        List<AgentWallet> wallets = new ArrayList<>();
        for (int i=0; i<count; i++)
            wallets.add(createAgentWallet());
        walletRepository.saveAll(wallets);
    }

    private AgentWallet createAgentWallet() {
        WalletKeyPair walletKeyPair = walletKeyPairGenerator.generate();
        return AgentWallet.builder()
                .address(walletKeyPair.getAddress())
                .privateKey(walletKeyPair.getPrivateKey())
                .build();
    }

}
