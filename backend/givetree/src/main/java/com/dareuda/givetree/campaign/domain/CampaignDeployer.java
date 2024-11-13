package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.blockchain.utils.EthereumCaller;
import com.dareuda.givetree.blockchain.utils.EthereumTransactionManager;
import com.dareuda.givetree.campaign.infrastructure.CampaignContract;
import com.dareuda.givetree.campaign.infrastructure.CampaignContractExceptionHandler;
import com.dareuda.givetree.common.config.ContractConfig;
import com.dareuda.givetree.common.config.Web3jConfig;
import com.dareuda.givetree.wallet.domain.Wallet;
import com.dareuda.givetree.wallet.domain.WalletVO;
import org.springframework.stereotype.Component;
import org.web3j.crypto.Credentials;
import org.web3j.tx.gas.DefaultGasProvider;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Set;

@Component
public class CampaignDeployer {

    private final Web3jConfig web3jConfig;
    private final ContractConfig contractConfig;
    private final EthereumTransactionManager transactionManager;
    private final EthereumCaller caller;

    public CampaignDeployer(
            Web3jConfig web3jConfig,
            ContractConfig contractConfig,
            EthereumTransactionManager transactionManager,
            CampaignContractExceptionHandler exceptionHandler
    ) {
        this.web3jConfig = web3jConfig;
        this.contractConfig = contractConfig;
        this.transactionManager = transactionManager;
        this.caller = new EthereumCaller(exceptionHandler);
    }

    public String deploy(WalletVO foundationWallet, WalletVO campaignWallet, LocalDateTime endDateTime) {
        long timestamp = endDateTime.toInstant(ZoneOffset.UTC).toEpochMilli();
        CampaignContract contract = transactionManager.execute(
                Set.of(),
                (Wallet wallet) -> caller.call(CampaignContract.deploy(
                        web3jConfig.web3j(),
                        Credentials.create(wallet.getPrivateKey()),
                        new DefaultGasProvider(),
                        contractConfig.getTokenContractAddress(),
                        foundationWallet.getAddress(),
                        campaignWallet.getAddress(),
                        BigInteger.valueOf(timestamp)
                ))
        );
        return contract.getContractAddress();
    }
}
