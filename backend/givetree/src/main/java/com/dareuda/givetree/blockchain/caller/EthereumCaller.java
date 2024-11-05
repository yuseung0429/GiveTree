package com.dareuda.givetree.blockchain.caller;

import com.dareuda.givetree.blockchain.exception.EthereumException;
import com.dareuda.givetree.blockchain.handler.EthereumExceptionHandler;
import lombok.RequiredArgsConstructor;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.Request;
import org.web3j.protocol.core.Response;

@RequiredArgsConstructor
public class EthereumCaller {

    private final EthereumExceptionHandler exceptionHandler;

    public <T> T call(RemoteFunctionCall<T> function) {
        try{
            return function.send();
        } catch (Exception e) {
            exceptionHandler.throwException(new EthereumException(e.getMessage(), e));
            return null;
        }
    }

    public <S, T extends Response> T call(Request<S, T> request) {
        try{
            return request.send();
        } catch (Exception e){
            exceptionHandler.throwException(new EthereumException(e.getMessage(), e));
            return null;
        }
    }
}
