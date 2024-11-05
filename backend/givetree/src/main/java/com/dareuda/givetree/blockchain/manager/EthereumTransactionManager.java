package com.dareuda.givetree.blockchain.manager;

import com.dareuda.givetree.blockchain.EthereumAgentQueue;
import com.dareuda.givetree.blockchain.exception.EthereumErrorCode;
import com.dareuda.givetree.blockchain.exception.EthereumException;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.wallet.domain.AgentWallet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class EthereumTransactionManager {

    private final EthereumAgentQueue agentQueue;

    public <T> T execute(Set<String> participants, TransactionFunction<T> function) {
        AgentWallet agentWallet = null;
        try {
            agentWallet = agentQueue.acquireAgentWallet(participants);
            return function.apply(agentWallet);
        } catch (EthereumException e) {
            throw new RestApiException(EthereumErrorCode.ETHEREUM_CALL_ERROR, e);
        }
        finally {
            agentQueue.releaseAgentWallet(agentWallet);
        }
    }

    @FunctionalInterface
    public interface TransactionFunction<T> {
        T apply(AgentWallet agentWallet);
    }
}