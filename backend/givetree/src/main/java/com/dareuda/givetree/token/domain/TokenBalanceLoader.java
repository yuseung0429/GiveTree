package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.blockchain.utils.EthereumCaller;
import com.dareuda.givetree.blockchain.utils.EthereumTransactionManager;
import com.dareuda.givetree.token.infrastructure.TokenContract;
import com.dareuda.givetree.token.infrastructure.TokenContractExceptionHandler;
import com.dareuda.givetree.wallet.domain.WalletVO;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class TokenBalanceLoader {

    private final EthereumTransactionManager transactionManager;
    private final EthereumCaller caller;

    public TokenBalanceLoader(
            EthereumTransactionManager transactionManager,
            TokenContractExceptionHandler exceptionHandler
    ) {
        this.transactionManager = transactionManager;
        this.caller = new EthereumCaller(exceptionHandler);
    }

    public long load(WalletVO wallet) {
        return transactionManager.execute(
                Set.of(wallet.getAddress()),
                wallet.getAddress(),
                TokenContract.class,
                (TokenContract tokenContract) -> caller.call(tokenContract.balanceOf(wallet.getAddress()))
        ).longValue();
    }
}
