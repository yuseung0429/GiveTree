package com.dareuda.givetree.sale.infrastructure;

import com.dareuda.givetree.sale.domain.Sale;
import com.dareuda.givetree.sale.domain.SalesSearchQuery;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SaleCustomRepository {

    List<Sale> findBySearch(SalesSearchQuery salesSearchQuery, Pageable pageable);
}
