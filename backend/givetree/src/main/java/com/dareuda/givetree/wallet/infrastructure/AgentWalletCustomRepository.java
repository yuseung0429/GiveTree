package com.dareuda.givetree.wallet.infrastructure;

import com.dareuda.givetree.wallet.domain.agent.AgentWallet;

import java.util.List;

public interface AgentWalletCustomRepository {
    List<AgentWallet> findTop(int n);
}
