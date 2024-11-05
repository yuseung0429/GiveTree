package com.dareuda.givetree.blockchain.service;

import com.dareuda.givetree.blockchain.caller.EthereumCaller;
import com.dareuda.givetree.blockchain.contracts.TokenContract;
import com.dareuda.givetree.blockchain.factory.TokenContractFactory;
import com.dareuda.givetree.blockchain.handler.TokenEthereumExceptionHandler;
import com.dareuda.givetree.blockchain.manager.EthereumTransactionManager;
import com.dareuda.givetree.wallet.domain.AgentWallet;
import org.springframework.stereotype.Component;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.math.BigInteger;
import java.util.Set;

@Component
public class TokenService {

    public TokenService(TokenContractFactory contractFactory,
                        TokenEthereumExceptionHandler exceptionHandler,
                        EthereumTransactionManager transactionManager) {
        this.transactionManager = transactionManager;
        this.contractFactory = contractFactory;
        this.ethereumCaller = new EthereumCaller(exceptionHandler);
    }

    private final EthereumTransactionManager transactionManager;
    private final TokenContractFactory contractFactory;
    private final EthereumCaller ethereumCaller;

    public void transferToken(String sender, String receiver, long amount) {
        Set<String> participants = Set.of(sender, receiver);
        TransactionReceipt transaction = transactionManager.execute(
                participants,
                agentWallet -> executeTokenTransfer(agentWallet, sender, receiver, amount)
        );
    }

    private TransactionReceipt executeTokenTransfer(AgentWallet agentWallet, String sender, String receiver, long amount) {
        TokenContract tokenContract = contractFactory.getInstance(agentWallet);
        return ethereumCaller.call(tokenContract.transferToken(sender, receiver, BigInteger.valueOf(amount)));
    }
}
