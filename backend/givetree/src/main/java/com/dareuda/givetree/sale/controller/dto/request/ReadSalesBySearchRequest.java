package com.dareuda.givetree.sale.controller.dto.request;

import com.dareuda.givetree.sale.domain.ProductionCondition;
import com.dareuda.givetree.sale.domain.SaleStatus;
import com.dareuda.givetree.sale.domain.SalesSearchQuery;
import lombok.Getter;

import java.util.List;

@Getter
public class ReadSalesBySearchRequest {

    private String query;

    private List<String> statuses;

    private List<String> productionConditions;

    private Boolean isDirectSale;

    private Boolean isDeliverySale;

    public SalesSearchQuery toSalesSearchQuery() {
        List<SaleStatus> statuses = this.statuses.stream()
                .map(SaleStatus::of)
                .toList();

        List<ProductionCondition> productionConditions = this.productionConditions.stream()
                .map(ProductionCondition::of)
                .toList();

        return SalesSearchQuery.builder()
                .query(query)
                .statuses(statuses)
                .productionConditions(productionConditions)
                .isDirectSale(isDirectSale)
                .isDeliverySale(isDeliverySale)
                .build();
    }
}
