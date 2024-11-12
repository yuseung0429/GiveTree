package com.dareuda.givetree.sale.domain;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class SaleCommand {

    private Long foundationId;

    private Long price;

    private Integer donationRate;

    private String title;

    private String description;

    private List<String> imageUrls;

    private SaleStatus status;

    private ProductionCondition productionCondition;

    private Boolean isDirectSale;

    private Boolean isDeliverySale;
}
