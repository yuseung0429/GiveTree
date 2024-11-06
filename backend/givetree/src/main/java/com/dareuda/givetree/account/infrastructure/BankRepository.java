package com.dareuda.givetree.account.infrastructure;

import com.dareuda.givetree.account.domain.Bank;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface BankRepository extends Repository<Bank, String>, BankCustomRepository {
    Optional<Bank> findByCode(String code);

    List<Bank> findAll();

    void saveAll(List<Bank> banks);
}
