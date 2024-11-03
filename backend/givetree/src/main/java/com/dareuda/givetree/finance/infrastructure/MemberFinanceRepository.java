package com.dareuda.givetree.finance.infrastructure;

import com.dareuda.givetree.finance.domain.MemberFinance;
import org.springframework.data.repository.Repository;

public interface MemberFinanceRepository extends Repository<MemberFinance, Long> {

    MemberFinance save(MemberFinance info);

    boolean existsById(long memberId);

    MemberFinance findById(long memberId);
}
