package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.account.infrastructure.BankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class BankRegistrar {

    private final BankRepository bankRepository;

    public void registerBanks(List<Bank> banks) {
        bankRepository.saveAll(banks);
    }
}
