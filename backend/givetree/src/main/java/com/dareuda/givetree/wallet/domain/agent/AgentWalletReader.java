package com.dareuda.givetree.wallet.domain.agent;

import com.dareuda.givetree.wallet.infrastructure.AgentWalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AgentWalletReader {

    private final AgentWalletRepository agentWalletRepository;

    public long countAgentWallets() {
        return agentWalletRepository.count();
    }

    public List<AgentWallet> readAgentWalletsTop(int n) {
        return agentWalletRepository.findTop(n);
    }
}