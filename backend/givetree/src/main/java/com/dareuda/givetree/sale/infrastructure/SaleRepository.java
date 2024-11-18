package com.dareuda.givetree.sale.infrastructure;

import com.dareuda.givetree.sale.domain.Sale;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface SaleRepository extends Repository<Sale, Long> {

    Optional<Sale> findByIdAndIsDeletedFalse(long saleId);

    @Query("""
    SELECT s
    FROM Sale s
    WHERE s.id = :saleId AND s.isDeleted = false
    """)
    Optional<Sale> findRemovedSaleById(long saleId);
    boolean existsByTitle(String title);

    Sale save(Sale sale);
}
