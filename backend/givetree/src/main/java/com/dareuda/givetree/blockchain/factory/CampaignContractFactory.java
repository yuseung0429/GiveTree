package com.dareuda.givetree.blockchain.factory;

import com.dareuda.givetree.campaign.infrastructure.CampaignContract;
import com.dareuda.givetree.wallet.domain.Wallet;
import org.springframework.stereotype.Component;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.tx.gas.DefaultGasProvider;

@Component
public class CampaignContractFactory extends ContractFactory<CampaignContract> {

    public CampaignContractFactory(Web3j web3j) {
        super(web3j);
    }

    @Override
    protected CampaignContract create(String contractAddress, Wallet wallet) {
        return CampaignContract.load(
                contractAddress,
                web3j,
                Credentials.create(wallet.getPrivateKey()),
                new DefaultGasProvider());
    }
}