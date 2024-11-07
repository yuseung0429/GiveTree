package com.dareuda.givetree.token.infrastructure;

import com.dareuda.givetree.blockchain.errors.handler.GlobalEthereumExceptionHandler;
import com.dareuda.givetree.blockchain.utils.ContractAgentRegister;
import com.dareuda.givetree.blockchain.utils.EthereumCaller;
import com.dareuda.givetree.common.config.ContractConfig;
import com.dareuda.givetree.common.config.Web3jConfig;
import com.dareuda.givetree.wallet.domain.Wallet;
import org.springframework.stereotype.Component;
import org.web3j.tx.gas.DefaultGasProvider;

@Component
public class TokenContractAgentRegistrar implements ContractAgentRegister {

    private final Web3jConfig web3jConfig;
    private final ContractConfig contractConfig;
    private final EthereumCaller ethereumCaller;

    public TokenContractAgentRegistrar(
            Web3jConfig web3jConfig,
            ContractConfig contractConfig,
            GlobalEthereumExceptionHandler exceptionHandler
    ) {
        this.web3jConfig = web3jConfig;
        this.contractConfig = contractConfig;
        this.ethereumCaller = new EthereumCaller(exceptionHandler);
    }

    public synchronized void register(Wallet wallet) {
        TokenContract tokenContract = TokenContract.load(
                contractConfig.getTokenContractAddress(),
                web3jConfig.web3j(),
                web3jConfig.adminCredentials(),
                new DefaultGasProvider()
        );
        ethereumCaller.call(tokenContract.registerAgents(wallet.getAddress()));
    }

    public synchronized boolean isRegistered(Wallet wallet) {
        TokenContract tokenContract = TokenContract.load(
                contractConfig.getTokenContractAddress(),
                web3jConfig.web3j(),
                web3jConfig.adminCredentials(),
                new DefaultGasProvider()
        );
        return ethereumCaller.call(tokenContract.isAgent(wallet.getAddress()));
    }
}
