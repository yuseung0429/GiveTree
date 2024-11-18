package com.dareuda.givetree.account.infrastructure;

import com.dareuda.givetree.account.domain.ExchangeFailure;
import com.dareuda.givetree.account.domain.RefundFailure;
import org.springframework.data.repository.Repository;

public interface ExchangeFailureRepository extends Repository<RefundFailure, Long> {
    ExchangeFailure save(ExchangeFailure exchangeFailure);
}
