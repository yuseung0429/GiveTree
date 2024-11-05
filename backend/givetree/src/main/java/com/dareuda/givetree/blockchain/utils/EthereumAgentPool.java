package com.dareuda.givetree.blockchain.utils;

import com.dareuda.givetree.common.config.Web3jConfig;
import com.dareuda.givetree.blockchain.errors.exception.AddressLockException;
import com.dareuda.givetree.blockchain.errors.exception.AgentNotAvailableException;
import com.dareuda.givetree.wallet.domain.AgentWallet;
import com.dareuda.givetree.wallet.domain.AgentWalletCreator;
import com.dareuda.givetree.wallet.domain.AgentWalletReader;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Queue;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

@Component
public class EthereumAgentPool {

    private final Queue<AgentWallet> agentQueue;
    private final ConcurrentHashMap<String, Boolean> lockedAddresses;
    private final ConcurrentHashMap<String, HashSet<String>> holdAddresses;

    public EthereumAgentPool(Web3jConfig web3jConfig, AgentWalletReader agentWalletReader, AgentWalletCreator agentWalletCreator) {
        int poolSize = web3jConfig.getAgentPoolSize();
        agentQueue = new ConcurrentLinkedQueue<>();
        lockedAddresses = new ConcurrentHashMap<>();
        holdAddresses = new ConcurrentHashMap<>();

        if (poolSize < 0 || poolSize > 100) {
            throw new RuntimeException("Agent pool size must be between 0 and 100");
        }

        int currentSize = (int) agentWalletReader.countAgentWallets();
        if (poolSize > currentSize) {
            agentWalletCreator.create(poolSize - currentSize);
        }

        List<AgentWallet> agentWallets = agentWalletReader.readAgentWalletsTop(poolSize);
        for (AgentWallet agentWallet : agentWallets) {
            holdAddresses.put(agentWallet.getAddress(), new HashSet<>());
            agentQueue.add(agentWallet);
        }
    }

    public synchronized AgentWallet acquireAgentWallet(Set<String> participants) {
        if (agentQueue.isEmpty()) {
            throw new AgentNotAvailableException();
        }

        if (!isLockAvailableAddresses(participants)) {
            throw new AddressLockException();
        }

        AgentWallet agentWallet = agentQueue.poll();

        lockingAddresses(participants);
        addAllHoldAddress(agentWallet.getAddress(), participants);

        return agentWallet;
    }

    public synchronized void releaseAgentWallet(AgentWallet agentWallet) {
        Set<String> participants = holdAddresses.get(agentWallet.getAddress());
        unlockingAddresses(participants);
        clearHoldAddress(agentWallet.getAddress());
        agentQueue.add(agentWallet);
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
}