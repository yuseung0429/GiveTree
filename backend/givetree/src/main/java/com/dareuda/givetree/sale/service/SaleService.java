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
    private final SaleUpdater saleUpdater;
    private final SaleRemover saleRemover;
    private final SaleReader saleReader;
    private final SalePaymentProcessor salePaymentProcessor;

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

    public void updateSale(long memberId, long saleId, SaleCommand command) {
        saleUpdater.update(memberId, saleId, command);
    }

    public void removeSale(long memberId, long saleId) {
        saleRemover.remove(memberId, saleId);
    }

    public void reserveSale(long sellerId, long purchaserId, long saleId) {
        saleUpdater.reserve(sellerId, purchaserId, saleId);
    }

    public void cancelReservation(long memberId, long saleId) {
        saleUpdater.cancelReservation(memberId, saleId);
    }

    public boolean isCurrentUserReserved(long memberId, long saleId) {
        return saleReader.isCurrentUserReserved(memberId, saleId);
    }

    public void processPayment(long purchaserId, long saleId, String simplePassword) {
        salePaymentProcessor.pay(purchaserId, saleId, simplePassword);
    }
}
