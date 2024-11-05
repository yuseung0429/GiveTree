package com.dareuda.givetree.finance.infrastructure;

import com.dareuda.givetree.finance.domain.MemberFinance;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface MemberFinanceRepository extends Repository<MemberFinance, Long> {

    MemberFinance save(MemberFinance info);

    boolean existsById(long memberId);

    Optional<MemberFinance> findById(long memberId);
}
