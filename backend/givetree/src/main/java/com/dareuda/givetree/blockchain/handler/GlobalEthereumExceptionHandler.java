package com.dareuda.givetree.blockchain.handler;

import com.dareuda.givetree.blockchain.exception.EthereumErrorCode;
import com.dareuda.givetree.blockchain.exception.EthereumException;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import org.springframework.stereotype.Component;

@Component
public class GlobalEthereumExceptionHandler implements EthereumExceptionHandler {
    @Override
    public void throwException(EthereumException e) {
        throw new RestApiException(EthereumErrorCode.ETHEREUM_CALL_ERROR);
    }
}