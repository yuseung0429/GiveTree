package com.dareuda.givetree.blockchain.utils;

import com.dareuda.givetree.blockchain.controller.EthereumErrorCode;
import com.dareuda.givetree.blockchain.errors.exception.EthereumException;
import com.dareuda.givetree.blockchain.factory.ContractFactory;
import com.dareuda.givetree.blockchain.factory.ContractFactoryProvider;
import com.dareuda.givetree.common.config.Web3jConfig;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.wallet.domain.AgentWallet;
import com.dareuda.givetree.wallet.domain.Wallet;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.loadtime.Agent;
import org.springframework.stereotype.Component;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.Ethereum;
import org.web3j.tx.Contract;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Set;
import java.util.function.Function;

@Component
public class EthereumTransactionManager {

    private final long thresholdBalanceGWEI;
    private final long rechargeAmountGWEI;

    private final EthereumBalanceChecker balanceChecker;
    private final EthereumBalanceCharger balanceCharger;

    private final EthereumAgentPool agentQueue;
    private final ContractFactoryProvider factoryProvider;

    public EthereumTransactionManager(
            Web3jConfig web3jConfig,
            EthereumBalanceChecker balanceChecker,
            EthereumBalanceCharger balanceCharger,
            EthereumAgentPool agentQueue,
            ContractFactoryProvider factoryProvider
    ) {
        this.thresholdBalanceGWEI = web3jConfig.getAgentThresholdBalanceGWEI();
        this.rechargeAmountGWEI = web3jConfig.getAgentRechargeAmountGWEI();
        this.balanceChecker = balanceChecker;
        this.balanceCharger = balanceCharger;
        this.agentQueue = agentQueue;
        this.factoryProvider = factoryProvider;
    }

    public <T, U extends Contract> T execute(
            Set<String> participants,
            String contractAddress,
            Class<U> contractClass,
            TransactionFunction<T, U> function
    ) {
        AgentWallet agentWallet = null;
        try {
            agentWallet = agentQueue.acquireAgentWallet(participants);
            checkBalanceAndRechargeIfNeeded(agentWallet);
            ContractFactory<U> factory = factoryProvider.getFactory(contractClass);
            U contract = factory.getInstance(contractAddress, agentWallet);
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
            checkBalanceAndRechargeIfNeeded(agentWallet);
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
    }

    private void checkBalanceAndRechargeIfNeeded(AgentWallet agentWallet) {
        long balanceGWEI = balanceChecker.getBalanceGWEI(agentWallet);
        if (balanceGWEI < thresholdBalanceGWEI) {
            balanceCharger.chargeGWEI(agentWallet, rechargeAmountGWEI);
        }
    }
}