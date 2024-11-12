package com.dareuda.givetree.sale.infrastructure;

import com.dareuda.givetree.sale.domain.Sale;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface SaleRepository extends Repository<Sale, Long> {

    Optional<Sale> findByIdAndIsDeletedFalse(long id);

    Sale save(Sale sale);
}
