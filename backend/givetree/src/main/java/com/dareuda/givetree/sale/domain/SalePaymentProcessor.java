package com.dareuda.givetree.sale.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class SalePaymentProcessor {

    private final SaleReader saleReader;
    private final SaleValidator saleValidator;
    private final SaleTransferrer saleTransferrer;
    private final SaleUpdater saleUpdater;

    public void pay(long purchaserId, long saleId, String simplePassword) {
        Sale sale = saleReader.read(saleId);
        saleValidator.validateIsPurchasable(sale, purchaserId);

        saleTransferrer.transfer(
                purchaserId,
                sale.getSellerId(),
                sale.getFundedFoundationId(),
                sale.getPrice(),
                sale.getContribution(),
                simplePassword,
                makePaymentMessage(sale)
        );

        saleUpdater.completeSale(saleId);
    }

    // Todo: 결제 메시지 수정
    private String makePaymentMessage(Sale sale) {
        return sale.getTitle();
    }
}
