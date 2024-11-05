package com.dareuda.givetree.blockchain.exception;

public class AddressLockException extends EthereumException {
    public AddressLockException() {
        super("주소가 현재 잠겨 있어 접근할 수 없습니다.", null);
    }
}
