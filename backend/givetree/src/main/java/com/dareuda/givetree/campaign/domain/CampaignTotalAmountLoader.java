package com.dareuda.givetree.campaign.domain;

import com.dareuda.givetree.blockchain.utils.EthereumCaller;
import com.dareuda.givetree.blockchain.utils.EthereumTransactionManager;
import com.dareuda.givetree.campaign.infrastructure.CampaignContract;
import com.dareuda.givetree.campaign.infrastructure.CampaignContractExceptionHandler;
import com.dareuda.givetree.history.domain.TransactionAppender;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class CampaignTotalAmountLoader {

    private final EthereumTransactionManager transactionManager;
    private final EthereumCaller caller;
    private final CampaignReader campaignReader;

    public CampaignTotalAmountLoader(
            EthereumTransactionManager transactionManager,
            CampaignContractExceptionHandler exceptionHandler,
            TransactionAppender transactionAppender, CampaignReader campaignReader) {
        this.transactionManager = transactionManager;
        this.caller = new EthereumCaller(exceptionHandler);
        this.campaignReader = campaignReader;
    }

    public long load(long campaignId) {
        Campaign campaign = campaignReader.read(campaignId);

        return transactionManager.execute(
                Set.of(),
                campaign.getContractAddress(),
                CampaignContract.class,
                (CampaignContract contract) -> caller.call(contract.totalAmount())
        ).longValue();
    }
}
