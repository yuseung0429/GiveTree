package com.dareuda.givetree.blockchain.errors.exception;

public class EthereumException extends RuntimeException {
    public EthereumException(String message) {
        super(message);
    }
    public EthereumException(String message, Exception e) {
        super(message, e);
    }
}
