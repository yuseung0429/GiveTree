package com.dareuda.givetree.wallet.infrastructure;

import com.dareuda.givetree.wallet.domain.Wallet;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface BaseWalletRepository<T extends Wallet> extends CrudRepository<T, Long> {
}