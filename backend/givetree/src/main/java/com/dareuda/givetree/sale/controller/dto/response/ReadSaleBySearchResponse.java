package com.dareuda.givetree.sale.controller.dto.response;

import com.dareuda.givetree.sale.domain.SaleDetail;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class ReadSaleBySearchResponse {

    private long id;

    private long price;

    private String title;

    private String imageUrl;

    private String status;

    private String productionsCondition;

    private Boolean isDirectSale;

    private Boolean isDeliverySale;

    private LocalDateTime createdDateTime;

    public static ReadSaleBySearchResponse from(SaleDetail saleDetail) {
        String imageUrl = null;
        if (!saleDetail.getImageUrls().isEmpty()) {
            imageUrl = saleDetail.getImageUrls().get(0);
        }

        return ReadSaleBySearchResponse.builder()
                .id(saleDetail.getId())
                .price(saleDetail.getPrice())
                .title(saleDetail.getTitle())
                .imageUrl(imageUrl)
                .status(saleDetail.getStatus())
                .productionsCondition(saleDetail.getProductionCondition())
                .isDirectSale(saleDetail.isDirectSale())
                .isDeliverySale(saleDetail.isDeliverySale())
                .createdDateTime(saleDetail.getCreatedDateTime())
                .build();
    }
}
