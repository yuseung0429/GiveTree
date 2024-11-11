package com.dareuda.givetree.sale.controller.dto.request;

import com.dareuda.givetree.sale.domain.ProductionCondition;
import com.dareuda.givetree.sale.domain.SaleCommand;
import com.dareuda.givetree.sale.domain.SaleStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class AppendSaleRequest {

    private long foundationId;

    private long price;

    private int donationRate;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private List<String> imageUrls;

    @NotBlank
    private String status;

    @NotBlank
    private String productionCondition;

    @NotNull
    private Boolean isDirectSale;

    @NotNull
    private Boolean isDeliverySale;

    public SaleCommand toCommand() {
        if (imageUrls == null) {
            imageUrls = new ArrayList<>();
        }

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
