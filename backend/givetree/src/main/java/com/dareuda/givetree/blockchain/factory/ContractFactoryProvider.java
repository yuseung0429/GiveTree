package com.dareuda.givetree.blockchain.factory;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import org.web3j.tx.Contract;

@Component
@RequiredArgsConstructor
public class ContractFactoryProvider {

    private final ApplicationContext applicationContext;

    @SuppressWarnings("unchecked")
    public <T extends Contract> ContractFactory<T> getFactory(Class<T> contractType) {
        return (ContractFactory<T>) applicationContext.getBean(getFactoryName(contractType));
    }

    private String getFactoryName(Class<? extends Contract> contractType) {
        return Character.toLowerCase(contractType.getSimpleName().charAt(0))
                + contractType.getSimpleName().substring(1)
                + "Factory";
    }
}