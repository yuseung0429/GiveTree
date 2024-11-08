package com.dareuda.givetree.transaction.infrastructure;

import com.dareuda.givetree.transaction.domain.Transaction;
import org.springframework.data.repository.Repository;

public interface TransactionRepository extends Repository<Transaction, Long> {
    Transaction save(Transaction transaction);
}
