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
        Sale sale = saleReader.read(saleId);
        List<String> imageUrls = sale.getImages().stream()
                .map(image -> image.getImage().getUrl())
                .toList();

        return SaleDetail.builder()
                .id(sale.getId())
                .sellerId(sale.getSellerId())
                .foundationId(sale.getFundedFoundationId())
                .price(sale.getPrice())
                .donationRate(sale.getDonationRate())
                .title(sale.getTitle())
                .description(sale.getDescription())
                .imageUrls(imageUrls)
                .status(sale.getStatus().getTitle())
                .productionCondition(sale.getProductionCondition().getTitle())
                .isDirectSale(sale.isDirectSale())
                .isDeliverySale(sale.isDeliverySale())
                .hits(sale.getHits())
                .createdDateTime(sale.getCreatedAt())
                .build();
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
