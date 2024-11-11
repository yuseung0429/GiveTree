package com.dareuda.givetree.sale.service;

import com.dareuda.givetree.sale.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SaleService {

    private final SaleDetailReader saleDetailReader;
    private final SaleHitsUpdater saleHitsUpdater;
    private final SaleAppender saleAppender;

    public SaleDetail readSale(long saleId) {
        saleHitsUpdater.update(saleId);
        return saleDetailReader.read(saleId);
    }

    public List<SaleDetail> readSalesBySearch(
            SalesSearchQuery salesSearchQuery,
            Pageable pageable
    ) {
        return saleDetailReader.readBySearch(salesSearchQuery, pageable);
    }

    public void appendSale(long memberId, SaleCommand command) {
        saleAppender.append(memberId, command);
    }
}
