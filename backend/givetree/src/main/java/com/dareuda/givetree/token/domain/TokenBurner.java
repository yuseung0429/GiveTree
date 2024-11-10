package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.account.domain.DepositProcessor;
import com.dareuda.givetree.account.domain.RefundFailureAppender;
import com.dareuda.givetree.account.domain.RefundProcessor;
import com.dareuda.givetree.blockchain.utils.EthereumCaller;
import com.dareuda.givetree.blockchain.utils.EthereumTransactionManager;
import com.dareuda.givetree.common.config.AdminConfig;
import com.dareuda.givetree.common.config.ContractConfig;
import com.dareuda.givetree.token.infrastructure.TokenContract;
import com.dareuda.givetree.token.infrastructure.TokenContractExceptionHandler;
import com.dareuda.givetree.transaction.domain.Transaction;
import com.dareuda.givetree.transaction.domain.TransactionAppender;
import com.dareuda.givetree.transaction.domain.TransactionUpdater;
import com.dareuda.givetree.wallet.domain.MemberWalletReader;
import com.dareuda.givetree.wallet.domain.Wallet;
import com.dareuda.givetree.wallet.domain.WalletReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.math.BigInteger;
import java.util.Set;

@Component
public class TokenBurner {

    public TokenBurner(
            AdminConfig adminConfig,
            WalletReader walletReader,
            ContractConfig contractConfig,
            EthereumTransactionManager transactionManager,
            TransactionAppender transactionAppender,
            TokenContractExceptionHandler exceptionHandler
    ) {
        this.adminConfig = adminConfig;
        this.walletReader = walletReader;
        this.contractConfig = contractConfig;
        this.transactionManager = transactionManager;
        this.transactionAppender = transactionAppender;
        this.caller = new EthereumCaller(exceptionHandler);
    }

    private final AdminConfig adminConfig;
    private final WalletReader walletReader;
    private final ContractConfig contractConfig;
    private final TransactionAppender transactionAppender;
    private final EthereumTransactionManager transactionManager;
    private final EthereumCaller caller;

    public TransactionReceipt burn(long walletId, long amount) {
        Wallet wallet = walletReader.read(walletId);

        return transactionManager.execute(
                Set.of(wallet.getAddress()),
                contractConfig.getTokenContractAddress(),
                TokenContract.class,
                (TokenContract tokenContract) -> caller.call(tokenContract.burnToken(wallet.getAddress(), BigInteger.valueOf(amount)))
        );
    }

    @Transactional
    public Transaction saveTransaction(long walletId, long amount, TransactionReceipt receipt) {
        return transactionAppender.append(
                walletId,
                adminConfig.getWalletId(),
                amount,
                receipt.getTransactionHash()
        );
    }
}
