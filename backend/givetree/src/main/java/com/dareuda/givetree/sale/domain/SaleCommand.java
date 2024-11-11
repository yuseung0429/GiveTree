package com.dareuda.givetree.sale.domain;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class SaleCommand {

    private long foundationId;

    private long price;

    private int donationRate;

    private String title;

    private String description;

    private List<String> imageUrls;

    private SaleStatus status;

    private ProductionCondition productionCondition;

    private boolean isDirectSale;

    private boolean isDeliverySale;
}
