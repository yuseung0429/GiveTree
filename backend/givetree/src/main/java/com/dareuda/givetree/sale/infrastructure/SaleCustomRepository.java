package com.dareuda.givetree.sale.infrastructure;

import com.dareuda.givetree.sale.domain.SaleDetail;
import com.dareuda.givetree.sale.domain.SalesSearchQuery;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SaleCustomRepository {

    List<SaleDetail> findBySearch(SalesSearchQuery salesSearchQuery, Pageable pageable);
}
