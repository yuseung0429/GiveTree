package com.dareuda.givetree.wallet.infrastructure;

import com.dareuda.givetree.wallet.domain.Wallet;
import org.springframework.data.repository.Repository;

public interface BaseWalletRepository<T extends Wallet> extends Repository<T, Long> {
    T save(T wallet);
}