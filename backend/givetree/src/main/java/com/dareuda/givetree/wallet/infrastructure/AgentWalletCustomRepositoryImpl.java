package com.dareuda.givetree.wallet.infrastructure;

import com.dareuda.givetree.wallet.domain.AgentWallet;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class AgentWalletCustomRepositoryImpl implements AgentWalletCustomRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<AgentWallet> findTop(int n) {
        Pageable pageable = PageRequest.of(0, 5);
        return entityManager.createQuery("SELECT a FROM AgentWallet a", AgentWallet.class)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();
    }
}
