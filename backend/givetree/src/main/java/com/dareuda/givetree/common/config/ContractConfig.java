package com.dareuda.givetree.common.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class ContractConfig {
    @Value("${blockchain.contract.token.address}")
    private String tokenContractAddress;
}
