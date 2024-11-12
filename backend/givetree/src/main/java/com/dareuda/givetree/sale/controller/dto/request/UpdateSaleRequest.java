package com.dareuda.givetree.sale.controller.dto.request;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.sale.controller.SaleErrorCode;
import com.dareuda.givetree.sale.domain.ProductionCondition;
import com.dareuda.givetree.sale.domain.SaleCommand;
import com.dareuda.givetree.sale.domain.SaleStatus;
import lombok.Getter;

import java.util.List;

@Getter
public class UpdateSaleRequest {

    private Long foundationId;

    private Long price;

    private Long contribution;

    private String title;

    private String description;

    private List<String> imageUrls;

    private String status;

    private String productionCondition;

    private Boolean isDirectSale;

    private Boolean isDeliverySale;

    public SaleCommand toCommand() {
        if (price != null && contribution != null && price < contribution) {
            throw new RestApiException(SaleErrorCode.PRICE_EXCEEDS_CONTRIBUTION);
        }

        return SaleCommand.builder()
                .foundationId(foundationId)
                .price(price)
                .contribution(contribution)
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
