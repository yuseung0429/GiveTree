package com.dareuda.givetree.transaction.infrastructure;

import com.dareuda.givetree.transaction.domain.Transaction;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface TransactionRepository extends Repository<Transaction, Long> {
    Transaction save(Transaction transaction);
    Optional<Transaction> findById(Long transactionId);
}
