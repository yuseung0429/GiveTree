package com.dareuda.givetree.wallet.infrastructure;

import com.dareuda.givetree.wallet.domain.AgentWallet;

public interface AgentWalletRepository extends BaseWalletRepository<AgentWallet>, AgentWalletCustomRepository {
    long count();
}
