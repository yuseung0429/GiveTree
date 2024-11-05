package com.dareuda.givetree.blockchain.utils;

import com.dareuda.givetree.blockchain.controller.EthereumErrorCode;
import com.dareuda.givetree.blockchain.errors.exception.EthereumException;
import com.dareuda.givetree.blockchain.factory.ContractFactory;
import com.dareuda.givetree.blockchain.factory.ContractFactoryProvider;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.wallet.domain.AgentWallet;
import com.dareuda.givetree.wallet.domain.Wallet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.web3j.tx.Contract;

import java.util.Set;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class EthereumTransactionManager {

    private final EthereumAgentPool agentQueue;
    private final ContractFactoryProvider factoryProvider;

    public <T, U extends Contract> T execute(Set<String> participants, TransactionFunction<T, U> function) {
        AgentWallet agentWallet = null;
        try {
            agentWallet = agentQueue.acquireAgentWallet(participants);
            ContractFactory<U> factory = factoryProvider.getFactory(function.getContractType());
            U contract = factory.getInstance(agentWallet);
            return function.apply(contract);
        } catch (EthereumException e) {
            throw new RestApiException(EthereumErrorCode.ETHEREUM_CALL_ERROR, e);
        } finally {
            if (agentWallet != null) {
                agentQueue.releaseAgentWallet(agentWallet);
            }
        }
    }

    public <T> T execute(Set<String> participants, Function<Wallet, T> function) {
        AgentWallet agentWallet = null;
        try {
            agentWallet = agentQueue.acquireAgentWallet(participants);
            return function.apply(agentWallet);
        } catch (EthereumException e) {
            throw new RestApiException(EthereumErrorCode.ETHEREUM_CALL_ERROR, e);
        } finally {
            if (agentWallet != null) {
                agentQueue.releaseAgentWallet(agentWallet);
            }
        }
    }

    @FunctionalInterface
    public interface TransactionFunction<T, U extends Contract> {
        T apply(U contract);

        @SuppressWarnings("unchecked")
        default Class<U> getContractType() {
            return (Class<U>) Contract.class;
        }
    }
}