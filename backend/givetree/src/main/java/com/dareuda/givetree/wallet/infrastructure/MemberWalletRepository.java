package com.dareuda.givetree.wallet.infrastructure;

import com.dareuda.givetree.wallet.domain.MemberWallet;

import java.util.Optional;

public interface MemberWalletRepository extends BaseWalletRepository<MemberWallet> {
    Optional<MemberWallet> findByMemberId(long memberId);
}
