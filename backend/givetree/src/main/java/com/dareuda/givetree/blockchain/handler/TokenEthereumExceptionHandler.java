package com.dareuda.givetree.blockchain.handler;

import com.dareuda.givetree.blockchain.exception.EthereumException;
import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TokenEthereumExceptionHandler implements EthereumExceptionHandler {

    private final GlobalEthereumExceptionHandler globalEthereumExceptionHandler;

    @Override
    public void throwException(EthereumException e) {
        String message = e.getMessage();
        if(message.contains("AAAA"))
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR);
        globalEthereumExceptionHandler.throwException(e);
    }
}
