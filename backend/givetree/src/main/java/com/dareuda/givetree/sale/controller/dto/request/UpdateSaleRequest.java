package com.dareuda.givetree.sale.controller.dto.request;

import com.dareuda.givetree.sale.domain.ProductionCondition;
import com.dareuda.givetree.sale.domain.SaleCommand;
import com.dareuda.givetree.sale.domain.SaleStatus;
import lombok.Getter;

import java.util.List;

@Getter
public class UpdateSaleRequest {

    private Long foundationId;

    private Long price;

    private Integer donationRate;

    private String title;

    private String description;

    private List<String> imageUrls;

    private String status;

    private String productionCondition;

    private Boolean isDirectSale;

    private Boolean isDeliverySale;

    public SaleCommand toCommand() {
        return SaleCommand.builder()
                .foundationId(foundationId)
                .price(price)
                .donationRate(donationRate)
                .title(title)
                .description(description)
                .imageUrls(imageUrls)
                .status(SaleStatus.of(status))
                .productionCondition(ProductionCondition.of(productionCondition))
                .isDirectSale(isDirectSale)
                .isDeliverySale(isDeliverySale)
                .build();
    }
}
