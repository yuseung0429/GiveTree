package com.dareuda.givetree.blockchain.errors.handler;

import com.dareuda.givetree.blockchain.errors.exception.EthereumException;

public interface EthereumExceptionHandler {
    void throwException(EthereumException e);
}