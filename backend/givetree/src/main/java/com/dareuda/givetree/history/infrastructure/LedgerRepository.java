package com.dareuda.givetree.history.infrastructure;

import com.dareuda.givetree.history.domain.Ledger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface LedgerRepository extends Repository<Ledger, Long> {
    Ledger save(Ledger ledger);
    Optional<Ledger> findById(Long id);

    @Query("""
           SELECT l
           FROM Ledger l
           JOIN FETCH l.account
           JOIN FETCH l.account.member
           JOIN FETCH l.account.bank
           WHERE l.account.member.id = :memberId
           ORDER BY l.processedAt DESC
           """)
    Page<Ledger> findByMemberId(Long memberId, Pageable pageable);
}
