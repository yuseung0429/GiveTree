package com.dareuda.givetree.finance.infrastructure;

import com.dareuda.givetree.finance.domain.MemberFinanceInfo;
import org.springframework.data.repository.Repository;

public interface MemberFinanceInfoRepository extends Repository<MemberFinanceInfo, Long> {
    MemberFinanceInfo save(MemberFinanceInfo info);

    boolean existsById(long memberId);
}
