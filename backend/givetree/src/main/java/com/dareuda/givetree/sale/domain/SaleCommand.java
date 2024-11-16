package com.dareuda.givetree.sale.domain;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class SaleCommand {

    private Long foundationId;

    private Long price;

    private Long contribution;

    private String title;

    private String description;

    private List<String> imageUrls;

    private ProductionCondition productionCondition;

    private Boolean isDirectSale;

    private Boolean isDeliverySale;
}
