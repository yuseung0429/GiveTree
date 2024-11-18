package com.dareuda.givetree.sale.controller.dto.request;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.sale.controller.SaleErrorCode;
import com.dareuda.givetree.sale.domain.ProductionCondition;
import com.dareuda.givetree.sale.domain.SaleCommand;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.util.List;

@Getter
public class AppendSaleRequest {

    @Min(1)
    private Long foundationId;

    @Min(0)
    private Long price;

    @Min(0)
    private Long contribution;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @Size(min = 1)
    private List<String> imageUrls;

    @NotBlank
    private String productionCondition;

    @NotNull
    private Boolean isDirectSale;

    @NotNull
    private Boolean isDeliverySale;

    public SaleCommand toCommand() {
        if (price < contribution) {
            throw new RestApiException(SaleErrorCode.PRICE_EXCEEDS_CONTRIBUTION);
        }

        return SaleCommand.builder()
                .foundationId(foundationId)
                .price(price)
                .contribution(contribution)
                .title(title)
                .description(description)
                .imageUrls(imageUrls)
                .productionCondition(ProductionCondition.of(productionCondition))
                .isDirectSale(isDirectSale)
                .isDeliverySale(isDeliverySale)
                .build();
    }
}
