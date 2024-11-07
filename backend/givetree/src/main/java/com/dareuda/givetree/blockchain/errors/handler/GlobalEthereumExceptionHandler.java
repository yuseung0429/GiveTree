package com.dareuda.givetree.blockchain.errors.handler;

import com.dareuda.givetree.blockchain.controller.EthereumErrorCode;
import com.dareuda.givetree.blockchain.errors.exception.EthereumException;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import org.springframework.stereotype.Component;

@Component
public class GlobalEthereumExceptionHandler implements EthereumExceptionHandler {
    @Override
    public void throwException(EthereumException e) {
        throw new RestApiException(EthereumErrorCode.ETHEREUM_CALL_ERROR);
    }
}