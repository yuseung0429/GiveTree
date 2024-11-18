package com.dareuda.givetree.history.infrastructure;

import com.dareuda.givetree.history.domain.TransactionLedger;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface TransactionLedgerRepository extends Repository<TransactionLedger, Long>, TransactionLedgerCustomRepository {
    TransactionLedger save(TransactionLedger transactionLedger);
    Optional<TransactionLedger> findByTransactionId(Long transactionId);

    @Query("""
           SELECT count(*) > 0
           FROM TransactionLedger tl
           WHERE tl.transaction.id in :transactionIds
           """)
    boolean existsByTransactionIds(List<Long> transactionIds);
}