package com.dareuda.givetree.blockchain.utils;

import com.dareuda.givetree.wallet.domain.Wallet;

public interface ContractAgentRegister {
    void register(Wallet wallet);

    boolean isRegistered(Wallet wallet);
}
