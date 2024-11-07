package com.dareuda.givetree.blockchain.utils;

import com.dareuda.givetree.common.config.Web3jConfig;
import com.dareuda.givetree.token.infrastructure.TokenContractAgentRegistrar;
import com.dareuda.givetree.wallet.domain.AgentWallet;
import com.dareuda.givetree.wallet.domain.AgentWalletCreator;
import com.dareuda.givetree.wallet.domain.AgentWalletReader;
import com.dareuda.givetree.wallet.domain.Wallet;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

@Component
public class EthereumAgentPool {

    private static final int MIN_POOL_SIZE = 1;
    private static final int MAX_POOL_SIZE = 50;

    private final ReentrantLock lock = new ReentrantLock();
    private final Condition availableCondition = lock.newCondition();

    private final int poolSize;

    private final Queue<AgentWallet> agentQueue;
    private final Map<String, Boolean> lockedAddresses;
    private final Map<String, Set<String>> holdAddresses;

    public EthereumAgentPool(
            Web3jConfig web3jConfig,
            AgentWalletReader agentWalletReader,
            AgentWalletCreator agentWalletCreator,
            TokenContractAgentRegistrar tokenContractAgentRegistrar
    ) {
        this.poolSize = web3jConfig.getAgentPoolSize();

        initAgentWallet(web3jConfig, agentWalletReader, agentWalletCreator);

        agentQueue = new ArrayDeque<>(poolSize);
        lockedAddresses = new HashMap<>();
        holdAddresses = new HashMap<>();

        int poolSize = web3jConfig.getAgentPoolSize();
        List<AgentWallet> agentWallets = agentWalletReader.readAgentWalletsTop(poolSize);
        for (AgentWallet agentWallet : agentWallets) {
            holdAddresses.put(agentWallet.getAddress(), new HashSet<>());
            agentQueue.add(agentWallet);
            registerIfNotAgent(agentWallet, tokenContractAgentRegistrar);
        }
    }

    public AgentWallet acquireAgentWallet(Set<String> participants) {
        lock.lock();
        try {
            while (!isLockAvailableAddresses(participants) || agentQueue.isEmpty()) {
                availableCondition.await();
            }
            AgentWallet agentWallet = agentQueue.poll();
            lockingAddresses(participants);
            addAllHoldAddress(agentWallet.getAddress(), participants);
            return agentWallet;
        } catch (InterruptedException ignore) {
            return null;
        } finally {
            lock.unlock();
        }
    }

    public void releaseAgentWallet(AgentWallet agentWallet) {
        lock.lock();
        try {
            Set<String> participants = holdAddresses.get(agentWallet.getAddress());
            unlockingAddresses(participants);
            clearHoldAddress(agentWallet.getAddress());
            agentQueue.add(agentWallet);
            availableCondition.signalAll();
        } finally {
            lock.unlock();
        }
    }

    private boolean isLockAvailableAddress(String address) {
        return lockedAddresses.containsKey(address);
    }

    private boolean isLockAvailableAddresses(Set<String> addresses) {
        for (String address : addresses) {
            if (isLockAvailableAddress(address)) {
                return false;
            }
        }
        return true;
    }

    private void lockingAddress(String address) {
        lockedAddresses.put(address, Boolean.TRUE);
    }

    private void lockingAddresses(Set<String> addresses) {
        for (String address : addresses) {
            lockingAddress(address);
        }
    }

    private void unlockingAddress(String address) {
        lockedAddresses.remove(address);
    }

    private void unlockingAddresses(Set<String> addresses) {
        for (String address : addresses) {
            unlockingAddress(address);
        }
    }

    private void addAllHoldAddress(String agentAddress, Set<String> addresses) {
        Set<String> holdAddress = holdAddresses.get(agentAddress);
        holdAddress.addAll(addresses);
    }

    private void clearHoldAddress(String agentAddress) {
        Set<String> holdAddress = holdAddresses.get(agentAddress);
        holdAddress.clear();
    }

    private void initAgentWallet(
            Web3jConfig web3jConfig,
            AgentWalletReader agentWalletReader,
            AgentWalletCreator agentWalletCreator
    ) {
        int poolSize = web3jConfig.getAgentPoolSize();
        if (poolSize < MIN_POOL_SIZE || poolSize > MAX_POOL_SIZE) {
            throw new IllegalArgumentException(String.format("Agent pool size must be between %d and %d", MIN_POOL_SIZE, MAX_POOL_SIZE));
        }

        int currentSize = (int) agentWalletReader.countAgentWallets();
        if (poolSize > currentSize) {
            agentWalletCreator.create(poolSize - currentSize);
        }
    }

    private void registerIfNotAgent(Wallet wallet, ContractAgentRegister contractAgentRegister) {
        if (!contractAgentRegister.isRegistered(wallet))
            contractAgentRegister.register(wallet);
    }
}