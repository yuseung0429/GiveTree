package com.dareuda.givetree.history.infrastructure;

import com.dareuda.givetree.history.domain.Transaction;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends Repository<Transaction, Long> {
    Transaction save(Transaction transaction);
    Optional<Transaction> findById(Long transactionId);

    @Query("""
           SELECT t
           FROM Transaction t
           LEFT JOIN TransactionLedger tl ON t.id = tl.transaction.id
           WHERE t.receiverWallet.id = :receiverWalletId AND tl is null
           """)
    List<Transaction> findUnreceivedTransactionByReceiverWalletId(long receiverWalletId);

    @Query("""
           SELECT t
           FROM Transaction t
           LEFT JOIN TransactionLedger tl ON t.id = tl.transaction.id
           WHERE t.receiverWallet.id = :receiverWalletId
           AND tl is null
           AND t.id in :transactionIds
           """)
    List<Transaction> findUnreceivedTransactionByReceiverWalletIdAndTransactionIds(long receiverWalletId, List<Long> transactionIds);

    @Query("""
           SELECT t
           FROM Transaction t
           WHERE t.id in :transactionIds
           """)
    List<Transaction> findByIds(List<Long> transactionIds);
}
