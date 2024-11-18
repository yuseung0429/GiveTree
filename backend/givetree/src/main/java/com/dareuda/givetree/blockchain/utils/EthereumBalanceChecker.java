package com.dareuda.givetree.blockchain.utils;

import com.dareuda.givetree.blockchain.errors.handler.EthereumBalanceCheckerExceptionHandler;
import com.dareuda.givetree.common.config.Web3jConfig;
import com.dareuda.givetree.wallet.domain.Wallet;
import org.springframework.stereotype.Component;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.utils.Convert;

import java.math.BigDecimal;

@Component
public class EthereumBalanceChecker {

    private final Web3j web3j;
    private final EthereumCaller ethereumCaller;

    public EthereumBalanceChecker(
            Web3jConfig web3jConfig,
            EthereumBalanceCheckerExceptionHandler exceptionHandler) {
        this.web3j = web3jConfig.web3j();
        this.ethereumCaller = new EthereumCaller(exceptionHandler);
    }

    public long getBalanceETHER(Wallet wallet) {
        return Convert.fromWei(getBalance(wallet), Convert.Unit.ETHER).longValue();
    }

    public long getBalanceGWEI(Wallet wallet) {
        return Convert.fromWei(getBalance(wallet), Convert.Unit.GWEI).longValue();
    }

    private BigDecimal getBalance(Wallet wallet) {
        EthGetBalance ethGetBalance = ethereumCaller.call(web3j.ethGetBalance(wallet.getAddress(), DefaultBlockParameterName.LATEST));
        return new BigDecimal(ethGetBalance.getBalance());
    }
}
