package com.dareuda.givetree.blockchain.errors.handler;

import com.dareuda.givetree.blockchain.errors.exception.EthereumException;
import org.springframework.stereotype.Component;

@Component
public class EthereumBalanceCheckerExceptionHandler implements EthereumExceptionHandler {
    @Override
    public void throwException(EthereumException e) {
        throw new EthereumException("ETHER 잔액 조회 실패");
    }
}
