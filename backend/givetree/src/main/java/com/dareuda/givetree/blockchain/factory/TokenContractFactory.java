package com.dareuda.givetree.blockchain.factory;

import com.dareuda.givetree.token.infrastructure.TokenContract;
import com.dareuda.givetree.wallet.domain.Wallet;
import org.springframework.stereotype.Component;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.tx.gas.DefaultGasProvider;

@Component
public class TokenContractFactory extends ContractFactory<TokenContract> {

    public TokenContractFactory(Web3j web3j) {
        super(web3j);
    }

    @Override
    protected TokenContract create(String contractAddress, Wallet wallet) {
        return TokenContract.load(
                contractAddress,
                web3j,
                Credentials.create(wallet.getPrivateKey()),
                new DefaultGasProvider());
    }
}
