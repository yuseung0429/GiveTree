package com.dareuda.givetree.account.infrastructure;

import com.dareuda.givetree.account.domain.Bank;

import java.util.List;

public interface BankCustomRepository {
    void saveAll(List<Bank> banks);
}