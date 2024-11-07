package com.dareuda.givetree.blockchain.errors.handler;

import com.dareuda.givetree.blockchain.errors.exception.EthereumException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EthereumBalanceChargerExceptionHandler implements EthereumExceptionHandler {

    @Override
    public void throwException(EthereumException e) {
        throw new EthereumException("ETHER 잔액 충전 실패");
    }
}
