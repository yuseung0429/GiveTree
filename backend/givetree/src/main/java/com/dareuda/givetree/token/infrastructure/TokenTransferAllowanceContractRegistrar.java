package com.dareuda.givetree.token.infrastructure;

import com.dareuda.givetree.blockchain.errors.handler.GlobalEthereumExceptionHandler;
import com.dareuda.givetree.blockchain.utils.EthereumCaller;
import com.dareuda.givetree.blockchain.utils.EthereumTransactionManager;
import com.dareuda.givetree.common.config.ContractConfig;
import com.dareuda.givetree.common.config.Web3jConfig;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class TokenTransferAllowanceContractRegistrar {

    private final ContractConfig contractConfig;
    private final EthereumCaller caller;
    private final EthereumTransactionManager transactionManager;

    public TokenTransferAllowanceContractRegistrar(
            ContractConfig contractConfig,
            GlobalEthereumExceptionHandler exceptionHandler,
            EthereumTransactionManager transactionManager) {
        this.contractConfig = contractConfig;
        this.caller = new EthereumCaller(exceptionHandler);
        this.transactionManager = transactionManager;
    }

    public void register(String contractAddress) {
        transactionManager.execute(
                Set.of(),
                contractConfig.getTokenContractAddress(),
                TokenContract.class,
                (TokenContract contract)
                        -> caller.call(contract.registerTransferTokenAllowedContracts(contractAddress))
        );
    }
}
