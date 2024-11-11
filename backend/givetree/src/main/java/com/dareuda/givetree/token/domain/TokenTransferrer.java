package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.blockchain.utils.EthereumCaller;
import com.dareuda.givetree.blockchain.utils.EthereumTransactionManager;
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
public class TokenTransferrer {

    private final ContractConfig contractConfig;
    private final EthereumTransactionManager transactionManager;
    private final EthereumCaller caller;
    private final TransactionAppender transactionAppender;

    public TokenTransferrer(
            ContractConfig contractConfig,
            EthereumTransactionManager transactionManager,
            TokenContractExceptionHandler exceptionHandler,
            TransactionAppender transactionAppender) {
        this.contractConfig = contractConfig;
        this.transactionManager = transactionManager;
        this.caller = new EthereumCaller(exceptionHandler);
        this.transactionAppender = transactionAppender;
    }

    public TransactionReceipt transfer(WalletVO senderWallet, WalletVO receiverWallet, long amount) {
        return transactionManager.execute(
                Set.of(senderWallet.getAddress(), receiverWallet.getAddress()),
                contractConfig.getTokenContractAddress(),
                TokenContract.class,
                (TokenContract tokenContract) -> caller.call(tokenContract.transferToken(senderWallet.getAddress(), receiverWallet.getAddress(), BigInteger.valueOf(amount)))
        );
    }

    @Transactional
    public Transaction saveTransaction(long senderWalletId, long receiverWalletId, long amount, TransactionType type, TransactionReceipt receipt) {
        return transactionAppender.append(
                senderWalletId,
                receiverWalletId,
                amount,
                type,
                receipt.getTransactionHash()
        );
    }
}
