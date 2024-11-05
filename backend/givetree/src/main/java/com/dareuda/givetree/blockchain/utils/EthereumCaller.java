package com.dareuda.givetree.blockchain.utils;

import com.dareuda.givetree.blockchain.errors.exception.EthereumException;
import com.dareuda.givetree.blockchain.errors.handler.EthereumExceptionHandler;
import lombok.RequiredArgsConstructor;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.Request;
import org.web3j.protocol.core.Response;

@RequiredArgsConstructor
public class EthereumCaller {

    private final EthereumExceptionHandler exceptionHandler;

    public <T> T call(RemoteCall<T> function) {
        try {
            return function.send();
        } catch (Exception e) {
            exceptionHandler.throwException(new EthereumException(e.getMessage(), e));
            return null;
        }
    }

    public <S, T extends Response<T>> T call(Request<S, T> request) {
        try {
            return request.send();
        } catch (Exception e){
            exceptionHandler.throwException(new EthereumException(e.getMessage(), e));
            return null;
        }
    }
}
