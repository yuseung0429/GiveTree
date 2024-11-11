package com.dareuda.givetree.history.infrastructure;

import com.dareuda.givetree.history.domain.Ledger;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface LedgerRepository extends Repository<Ledger, Long> {
    Ledger save(Ledger ledger);
    Optional<Ledger> findById(Long id);
}
