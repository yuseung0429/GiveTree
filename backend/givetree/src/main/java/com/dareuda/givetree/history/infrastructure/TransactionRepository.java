package com.dareuda.givetree.history.infrastructure;

import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.wallet.domain.member.MemberWallet;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends Repository<Transaction, Long> {
    Transaction save(Transaction transaction);
    Optional<Transaction> findById(Long transactionId);
    Optional<Transaction> getReferenceById(long transactionId);

    @Query("""
           SELECT t
           FROM Transaction t
           LEFT JOIN TransactionLedger tl ON t.id = tl.transaction.id
           JOIN FETCH t.senderWallet sw
           JOIN FETCH TREAT(sw AS MemberWallet).member
           WHERE t.receiverWallet.id = :receiverWalletId
           AND tl is null
           ORDER BY t.createdAt DESC
           """)
    Slice<Transaction> findUnreceivedFoundationDonationTransactionByReceiverWalletId(long receiverWalletId, Pageable pageable);

    @Query("""
           SELECT t
           FROM Transaction t
           LEFT JOIN TransactionLedger tl ON t.id = tl.transaction.id
           JOIN FETCH t.senderWallet sw
           JOIN FETCH TREAT(sw AS MemberWallet).member
           WHERE t.receiverWallet.id = :receiverWalletId
           AND tl is null
           AND t.id in :transactionIds
           """)
    List<Transaction> findUnreceivedFoundationDonationTransactionByReceiverWalletIdAndTransactionIds(long receiverWalletId, List<Long> transactionIds);

    @Query("""
           SELECT t
           FROM Transaction t
           LEFT JOIN TransactionLedger tl ON t.id = tl.transaction.id
           JOIN FETCH t.senderWallet sw
           JOIN FETCH TREAT(sw AS CampaignWallet).campaign
           WHERE t.receiverWallet.id = :receiverWalletId
           AND tl is null
           ORDER BY t.createdAt DESC
           """)
    Slice<Transaction> findUnreceivedCampaignDonationTransactionByReceiverWalletId(long receiverWalletId, Pageable pageable);


    @Query("""
           SELECT t
           FROM Transaction t
           LEFT JOIN TransactionLedger tl ON t.id = tl.transaction.id
           JOIN FETCH t.senderWallet sw
           JOIN FETCH TREAT(sw AS CampaignWallet).campaign
           WHERE t.receiverWallet.id = :receiverWalletId
           AND tl is null
           AND t.id in :transactionIds
           """)
    List<Transaction> findUnreceivedCampaignDonationTransactionByReceiverWalletIdAndTransactionIds(long receiverWalletId, List<Long> transactionIds);


    @Query("""
           SELECT t
           FROM Transaction t
           WHERE t.id in :transactionIds
           """)
    List<Transaction> findByIds(List<Long> transactionIds);
}
