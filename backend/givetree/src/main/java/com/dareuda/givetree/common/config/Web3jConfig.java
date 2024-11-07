package com.dareuda.givetree.common.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

@Getter
@Configuration
public class Web3jConfig {
    @Bean
    public Web3j web3j() {
        return Web3j.build(new HttpService(String.format("%s:%d", networkHost, networkPort)));
    }

    @Value("${blockchain.admin.wallet.address}")
    private String adminAddress;

    @Value("${blockchain.admin.wallet.private-key}")
    private String adminPrivateKey;

    @Value("${blockchain.network.host}")
    private String networkHost;

    @Value("${blockchain.network.port}")
    private Integer networkPort;

    @Value("${blockchain.agent.pool-size:20}")
    private Integer agentPoolSize;

    @Value("${blockchain.agent.threshold-balance-gwei:1000000000}")
    private long agentThresholdBalanceGWEI;

    @Value("${blockchain.agent.recharge-amount-gwei:5000000000}")
    private long agentRechargeAmountGWEI;

    @Bean
    public Credentials adminCredentials() {
        return Credentials.create(adminPrivateKey);
    }
}

