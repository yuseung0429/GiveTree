package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.blockchain.utils.EthereumCaller;
import com.dareuda.givetree.blockchain.utils.EthereumTransactionManager;
import com.dareuda.givetree.campaign.infrastructure.CampaignContract;
import com.dareuda.givetree.campaign.infrastructure.CampaignContractExceptionHandler;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.history.domain.TransactionAppender;
import com.dareuda.givetree.history.domain.TransactionType;
import com.dareuda.givetree.wallet.domain.WalletVO;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.util.Set;

@Component
public class CampaignContractCloser {

    private final EthereumTransactionManager transactionManager;
    private final EthereumCaller caller;
    private final TransactionAppender transactionAppender;

    public CampaignContractCloser(
            EthereumTransactionManager transactionManager,
            CampaignContractExceptionHandler exceptionHandler,
            TransactionAppender transactionAppender) {
        this.transactionManager = transactionManager;
        this.caller = new EthereumCaller(exceptionHandler);
        this.transactionAppender = transactionAppender;
    }

    public TransactionReceipt close(WalletVO foundationWallet, WalletVO campaignWallet, String campaignContractAddress) {
        return transactionManager.execute(
                Set.of(foundationWallet.getAddress(), campaignWallet.getAddress()),
                campaignContractAddress,
                CampaignContract.class,
                (CampaignContract contract) -> caller.call(contract.close(foundationWallet.getAddress()))
        );
    }

    @Transactional
    public Transaction saveTransaction(long foundationWalletId, long campaignWalletId, long amount, TransactionType type, TransactionReceipt receipt) {
        return transactionAppender.append(
                campaignWalletId,
                foundationWalletId,
                amount,
                type,
                receipt.getTransactionHash()
        );
    }
}
