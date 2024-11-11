package com.dareuda.givetree.sale.domain;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class SalesSearchQuery {

    private String query;

    private List<SaleStatus> statuses;

    private List<ProductionCondition> productionConditions;

    private boolean isDirectSale;

    private boolean isDeliverySale;
}
