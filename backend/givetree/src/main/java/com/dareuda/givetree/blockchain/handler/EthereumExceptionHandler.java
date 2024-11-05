package com.dareuda.givetree.blockchain.handler;

import com.dareuda.givetree.blockchain.exception.EthereumException;

public interface EthereumExceptionHandler {
    void throwException(EthereumException e);
}