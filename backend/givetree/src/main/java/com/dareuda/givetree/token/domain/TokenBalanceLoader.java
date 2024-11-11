package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.blockchain.utils.EthereumCaller;
import com.dareuda.givetree.blockchain.utils.EthereumTransactionManager;
import com.dareuda.givetree.common.config.ContractConfig;
import com.dareuda.givetree.token.infrastructure.TokenContract;
import com.dareuda.givetree.token.infrastructure.TokenContractExceptionHandler;
import com.dareuda.givetree.wallet.domain.WalletVO;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class TokenBalanceLoader {

    private final ContractConfig contractConfig;
    private final EthereumTransactionManager transactionManager;
    private final EthereumCaller caller;

    public TokenBalanceLoader(
            ContractConfig contractConfig,
            EthereumTransactionManager transactionManager,
            TokenContractExceptionHandler exceptionHandler
    ) {
        this.contractConfig = contractConfig;
        this.transactionManager = transactionManager;
        this.caller = new EthereumCaller(exceptionHandler);
    }

    public long load(WalletVO wallet) {
        return transactionManager.execute(
                Set.of(wallet.getAddress()),
                contractConfig.getTokenContractAddress(),
                TokenContract.class,
                (TokenContract tokenContract)
                        -> caller.call(tokenContract.balanceOf(wallet.getAddress()))
        ).longValue();
    }
}
