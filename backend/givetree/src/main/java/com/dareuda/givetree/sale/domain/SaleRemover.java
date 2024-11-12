package com.dareuda.givetree.sale.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Component
public class SaleRemover {

    private final SaleReader saleReader;
    private final SaleValidator saleValidator;

    @Transactional
    public void remove(long memberId, long saleId) {
        Sale sale = saleReader.read(saleId);
        saleValidator.validateOwner(memberId, sale);
        sale.remove();
    }
}
