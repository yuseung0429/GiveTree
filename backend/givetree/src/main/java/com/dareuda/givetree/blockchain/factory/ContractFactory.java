package com.dareuda.givetree.blockchain.factory;

import com.dareuda.givetree.wallet.domain.Wallet;
import org.web3j.protocol.Web3j;
import org.web3j.tx.Contract;

import java.util.HashMap;
import java.util.Map;

public abstract class ContractFactory<T extends Contract> {

    private final Map<String, T> cached;
    protected final Web3j web3j;

    public ContractFactory(Web3j web3j) {
        this.web3j = web3j;
        this.cached = new HashMap<>();
    }

    public T getInstance(Wallet wallet) {
        T contract = cached.get(wallet.getAddress());
        if (contract != null) {
            return cached.get(wallet.getAddress());
        }
        contract = create(wallet);
        cached.put(wallet.getAddress(), contract);
        return contract;
    }

    protected abstract T create(Wallet wallet);
}