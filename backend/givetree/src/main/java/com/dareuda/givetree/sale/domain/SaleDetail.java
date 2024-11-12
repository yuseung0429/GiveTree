package com.dareuda.givetree.sale.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class SaleDetail {

    private long id;

    private long sellerId;

    private long foundationId;

    private long price;

    private long contribution;

    private String title;

    private String description;

    private List<String> imageUrls;

    private String status;

    private String productionCondition;

    private boolean isDirectSale;

    private boolean isDeliverySale;

    private long hits;

    private LocalDateTime createdDateTime;

    public static SaleDetail from(Sale sale) {
        List<String> imageUrls = sale.getImages().stream()
                .map(image -> image.getImage().getUrl())
                .toList();

        return SaleDetail.builder()
                .id(sale.getId())
                .sellerId(sale.getSellerId())
                .foundationId(sale.getFundedFoundationId())
                .price(sale.getPrice())
                .contribution(sale.getContribution())
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
}
