package com.dareuda.givetree.sale.domain;

import com.dareuda.givetree.sale.infrastructure.SaleCustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Component
public class SaleDetailReader {

    private final SaleReader saleReader;
    private final SaleCustomRepository saleCustomRepository;

    @Transactional(readOnly = true)
    public SaleDetail read(long saleId) {
        return SaleDetail.from(saleReader.read(saleId));
    }

    @Transactional(readOnly = true)
    public List<SaleDetail> readBySearch(
            SalesSearchQuery salesSearchQuery,
            Pageable pageable
    ) {
        List<Sale> sales = saleCustomRepository.findBySearch(salesSearchQuery, pageable);
        return sales.stream()
                .map(SaleDetail::from)
                .toList();
    }
}
