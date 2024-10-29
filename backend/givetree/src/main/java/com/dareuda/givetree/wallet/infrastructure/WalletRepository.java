package com.dareuda.givetree.wallet.infrastructure;

import com.dareuda.givetree.wallet.domain.Wallet;
import org.springframework.data.repository.Repository;

public interface WalletRepository extends Repository<Wallet, Long> {
    Wallet save(Wallet wallet);
}
