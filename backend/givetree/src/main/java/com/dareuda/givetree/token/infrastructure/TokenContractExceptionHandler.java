package com.dareuda.givetree.token.infrastructure;

import com.dareuda.givetree.blockchain.errors.exception.EthereumException;
import com.dareuda.givetree.blockchain.errors.handler.EthereumExceptionHandler;
import com.dareuda.givetree.blockchain.errors.handler.GlobalEthereumExceptionHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TokenContractExceptionHandler implements EthereumExceptionHandler {

    private final GlobalEthereumExceptionHandler globalExceptionHandler;

    @Override
    public void throwException(EthereumException e) {
        globalExceptionHandler.throwException(e);
    }
}
