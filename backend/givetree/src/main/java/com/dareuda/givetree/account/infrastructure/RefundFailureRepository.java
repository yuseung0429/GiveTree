package com.dareuda.givetree.account.infrastructure;

import com.dareuda.givetree.account.domain.RefundFailure;
import org.springframework.data.repository.Repository;

public interface RefundFailureRepository extends Repository<RefundFailure, Long> {
    RefundFailure save(RefundFailure refundFailure);
}
