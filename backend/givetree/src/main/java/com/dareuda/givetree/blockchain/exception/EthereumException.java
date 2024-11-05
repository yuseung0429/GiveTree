package com.dareuda.givetree.blockchain.exception;

public class EthereumException extends RuntimeException {
    public EthereumException(String message, Exception e) {
        super(message, e);
    }
}
