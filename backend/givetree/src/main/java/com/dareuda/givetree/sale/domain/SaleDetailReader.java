package com.dareuda.givetree.sale.domain;

import com.dareuda.givetree.sale.infrastructure.SaleCustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class SaleDetailReader {

    private final SaleReader saleReader;
    private final SaleCustomRepository saleCustomRepository;

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

    public List<SaleDetail> readBySearch(
            SalesSearchQuery salesSearchQuery,
            Pageable pageable
    ) {
        return saleCustomRepository.findBySearch(salesSearchQuery, pageable);
    }
}
