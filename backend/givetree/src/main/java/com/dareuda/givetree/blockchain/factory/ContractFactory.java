package com.dareuda.givetree.blockchain.factory;

import com.dareuda.givetree.wallet.domain.Wallet;
import lombok.RequiredArgsConstructor;
import org.web3j.protocol.Web3j;
import org.web3j.tx.Contract;

@RequiredArgsConstructor
public abstract class ContractFactory<T extends Contract> {

    protected final Web3j web3j;

    public T getInstance(String contractAddress, Wallet wallet) {
        return create(contractAddress, wallet);
    }

    protected abstract T create(String contractAddress, Wallet wallet);
}