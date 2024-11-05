package com.dareuda.givetree.account.infrastructure;

import com.dareuda.givetree.account.domain.Account;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface AccountRepository extends Repository<Account, Long> {
    Account save(Account account);

    @Query("""
           SELECT count(a) > 0
           FROM Account a
           WHERE a.member.id = :memberId AND a.isActive = :isActive
           """)
    boolean existsByMemberIdAndIsActive(long memberId, boolean isActive);

    Optional<Account> findById(Long id);

    Optional<Account> findByAccountNumber(String accountNumber);

    @Query("""
           SELECT a
           FROM Account a
           WHERE a.member.id = :memberId AND a.isActive = :isActive
           """)
    Optional<Account> findByMemberIdAndIsActive(long memberId, boolean isActive);
}