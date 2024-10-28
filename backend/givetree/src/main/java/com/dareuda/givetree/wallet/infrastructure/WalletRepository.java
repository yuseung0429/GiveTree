package com.dareuda.givetree.wallet.infrastructure;

import com.dareuda.givetree.wallet.domain.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
}
