package com.dareuda.givetree.sale.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Component
public class SaleHitsUpdater {

    private final SaleReader saleReader;

    @Transactional
    public void update(long saleId) {
        saleReader.read(saleId).updateHits();
    }
}
