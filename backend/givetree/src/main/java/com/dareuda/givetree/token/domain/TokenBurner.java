package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.blockchain.utils.EthereumCaller;
import com.dareuda.givetree.blockchain.utils.EthereumTransactionManager;
import com.dareuda.givetree.common.config.AdminConfig;
import com.dareuda.givetree.common.config.ContractConfig;
import com.dareuda.givetree.history.domain.TransactionType;
import com.dareuda.givetree.token.infrastructure.TokenContract;
import com.dareuda.givetree.token.infrastructure.TokenContractExceptionHandler;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.history.domain.TransactionAppender;
import com.dareuda.givetree.wallet.domain.WalletVO;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.math.BigInteger;
import java.util.Set;

@Component
public class TokenBurner {

    private final AdminConfig adminConfig;
    private final ContractConfig contractConfig;
    private final TransactionAppender transactionAppender;
    private final EthereumTransactionManager transactionManager;
    private final EthereumCaller caller;

    public TokenBurner(
            AdminConfig adminConfig,
            ContractConfig contractConfig,
            EthereumTransactionManager transactionManager,
            TransactionAppender transactionAppender,
            TokenContractExceptionHandler exceptionHandler
    ) {
        this.adminConfig = adminConfig;
        this.contractConfig = contractConfig;
        this.transactionManager = transactionManager;
        this.transactionAppender = transactionAppender;
        this.caller = new EthereumCaller(exceptionHandler);
    }

    public TransactionReceipt burn(WalletVO wallet, long amount) {
        return transactionManager.execute(
                Set.of(wallet.getAddress()),
                contractConfig.getTokenContractAddress(),
                TokenContract.class,
                (TokenContract tokenContract)
                        -> caller.call(tokenContract.burnToken(wallet.getAddress(), BigInteger.valueOf(amount)))
        );
    }

    @Transactional
    public Transaction saveTransaction(long walletId, long amount, TransactionType type, TransactionReceipt receipt) {
        return transactionAppender.append(
                walletId,
                adminConfig.getWalletId(),
                amount,
                type,
                receipt.getTransactionHash()
        );
    }
}