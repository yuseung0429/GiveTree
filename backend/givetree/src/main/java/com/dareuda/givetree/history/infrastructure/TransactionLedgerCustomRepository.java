package com.dareuda.givetree.history.infrastructure;

import com.dareuda.givetree.history.domain.TransactionLedger;

import java.util.List;

public interface TransactionLedgerCustomRepository {
    void saveAll(List<TransactionLedger> transactionLedgers);
}
