package com.dareuda.givetree.sale.controller.dto.request;

import com.dareuda.givetree.sale.domain.ProductionCondition;
import com.dareuda.givetree.sale.domain.SaleStatus;
import com.dareuda.givetree.sale.domain.SalesSearchQuery;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
public class ReadSalesBySearchRequest {

    private String query;

    private List<String> statuses;

    private List<String> productionConditions;

    private Boolean isDirectSale;

    private Boolean isDeliverySale;

    public SalesSearchQuery toSalesSearchQuery() {
        if (statuses == null) {
            statuses = new ArrayList<>();
        }
        if (productionConditions == null) {
            productionConditions = new ArrayList<>();
        }
        List<SaleStatus> saleStatuses = this.statuses.stream()
                .map(SaleStatus::of)
                .toList();
        List<ProductionCondition> saleProductionConditions = this.productionConditions.stream()
                .map(ProductionCondition::of)
                .toList();

        return SalesSearchQuery.builder()
                .query(query)
                .statuses(saleStatuses)
                .productionConditions(saleProductionConditions)
                .isDirectSale(isDirectSale)
                .isDeliverySale(isDeliverySale)
                .build();
    }
}
