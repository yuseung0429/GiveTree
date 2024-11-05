package com.dareuda.givetree.blockchain.errors.exception;

public class AddressLockException extends EthereumException {
    private static final String MESSAGE = "주소가 현재 잠겨 있어 접근할 수 없습니다.";

    public AddressLockException() {
        super(MESSAGE);
    }

    public AddressLockException(Exception e) {
        super(MESSAGE, e);
    }
}
