package com.dareuda.givetree.sale.controller.dto.response;

import com.dareuda.givetree.sale.domain.SaleDetail;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ReadSaleBySearchResponse {

    private long id;

    private long price;

    private String title;

    private String imageUrl;

    private String status;

    private String productionsCondition;

    private boolean isDirectSale;

    private boolean isDeliverySale;

    public static ReadSaleBySearchResponse from(SaleDetail saleDetail) {
        return ReadSaleBySearchResponse.builder()
                .id(saleDetail.getId())
                .price(saleDetail.getPrice())
                .title(saleDetail.getTitle())
                .imageUrl(saleDetail.getImageUrls().get(0))
                .status(saleDetail.getStatus())
                .productionsCondition(saleDetail.getProductionCondition())
                .isDirectSale(saleDetail.isDirectSale())
                .isDeliverySale(saleDetail.isDeliverySale())
                .build();
    }
}
