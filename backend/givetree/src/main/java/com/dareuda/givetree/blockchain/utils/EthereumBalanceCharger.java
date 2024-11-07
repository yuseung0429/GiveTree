package com.dareuda.givetree.blockchain.utils;

import com.dareuda.givetree.blockchain.errors.handler.EthereumBalanceChargerExceptionHandler;
import com.dareuda.givetree.common.config.Web3jConfig;
import com.dareuda.givetree.wallet.domain.Wallet;
import org.springframework.stereotype.Component;

import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.Transfer;
import org.web3j.utils.Convert;

import java.math.BigDecimal;

@Component
public class EthereumBalanceCharger {

    private final EthereumCaller ethereumCaller;
    private final Transfer transfer;

    public EthereumBalanceCharger(
            Web3jConfig web3jConfig,
            EthereumBalanceChargerExceptionHandler exceptionHandler) {
        this.transfer = new Transfer(
                web3jConfig.web3j(),
                new RawTransactionManager(web3jConfig.web3j(), web3jConfig.adminCredentials())
        );
        this.ethereumCaller = new EthereumCaller(exceptionHandler);
    }

    public synchronized void chargeETHER(Wallet wallet, long amountETHER) {
        ethereumCaller.call(transfer.sendFunds(wallet.getAddress(), BigDecimal.valueOf(amountETHER), Convert.Unit.ETHER));
    }

    public synchronized void chargeGWEI(Wallet wallet, long amountGWEI) {
        ethereumCaller.call(transfer.sendFunds(wallet.getAddress(), BigDecimal.valueOf(amountGWEI), Convert.Unit.GWEI));
    }
}
