package com.dareuda.givetree.sale.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class SaleDetail {

    private long id;

    private long sellerId;

    private long foundationId;

    private long price;

    private int donationRate;

    private String title;

    private String description;

    private List<String> imageUrls;

    private String status;

    private String productionCondition;

    private boolean isDirectSale;

    private boolean isDeliverySale;

    private long hits;

    private LocalDateTime createdDateTime;
}
