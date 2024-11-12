package com.dareuda.givetree.sale.domain;

import com.dareuda.givetree.common.domain.BaseEntity;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.sale.controller.SaleErrorCode;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Sale extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long sellerId;

    private Long purchaserId;

    @NotNull
    private Long fundedFoundationId;

    private Long transactionId;

    private long price;

    private long contribution;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @OneToMany(mappedBy = "sale", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<SaleImage> images = new ArrayList<>();

    @NotNull
    @Enumerated(EnumType.STRING)
    private SaleStatus status;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ProductionCondition productionCondition;

    private boolean isDirectSale;

    private boolean isDeliverySale;

    private long hits;

    @NotNull
    private LocalDateTime updatedDateTime;

    @Builder
    private Sale(Long sellerId, Long fundedFoundationId, Long purchaserId, Long transactionId, long price, long contribution, String title, String description, SaleStatus status, ProductionCondition productionCondition, boolean isDirectSale, boolean isDeliverySale, LocalDateTime updatedDateTime) {
        this.sellerId = sellerId;
        this.fundedFoundationId = fundedFoundationId;
        this.purchaserId = purchaserId;
        this.transactionId = transactionId;
        this.price = price;
        this.contribution = contribution;
        this.title = title;
        this.description = description;
        this.status = status;
        this.productionCondition = productionCondition;
        this.isDirectSale = isDirectSale;
        this.isDeliverySale = isDeliverySale;
        this.updatedDateTime = updatedDateTime;
    }

    public void updateHits() {
        this.hits++;
    }

    public void updatePurchaserId(Long memberId) {
        if (memberId != null && memberId < 1) {
            return;
        }
        this.purchaserId = memberId;
    }

    public void updateFoundationId(Long fundedFoundationId) {
        if (fundedFoundationId == null) {
            return;
        }
        if (fundedFoundationId < 1) {
            return;
        }
        this.fundedFoundationId = fundedFoundationId;
    }

    public void updatePriceAndContribution(Long price, Long contribution) {
        if (price != null && contribution != null && price > contribution) {
            this.price = price;
            this.contribution = contribution;
        }
        updatePrice(price);
        updateContribution(contribution);
    }

    public void updatePrice(Long price) {
        if (price == null) {
            return;
        }
        if (price < 0 || price < this.contribution) {
            return;
        }
        this.price = price;
    }

    public void updateContribution(Long contribution) {
        if (contribution == null) {
            return;
        }
        if (contribution < 0 || contribution > this.price) {
            return;
        }
        this.contribution = contribution;
    }

    public void updateTitle(String title) {
        if (title != null) {
            this.title = title;
        }
    }

    public void updateDescription(String description) {
        if (description != null) {
            this.description = description;
        }
    }

    public void updateImages(List<SaleImage> images) {
        if (images == null) {
            return;
        }
        this.images.clear();
        this.images.addAll(images);
    }

    public void updateStatus(SaleStatus status) {
        if (status != null) {
            this.status = status;
        }
    }

    public void updateProductionCondition(ProductionCondition productionCondition) {
        if (productionCondition != null) {
            this.productionCondition = productionCondition;
        }
    }

    public void updateIsDirectSale(Boolean isDirectSale) {
        if (isDirectSale != null) {
            this.isDirectSale = isDirectSale;
        }
    }

    public void updateIsDeliverySale(Boolean isDeliverySale) {
        if (isDeliverySale != null) {
            this.isDeliverySale = isDeliverySale;
        }
    }

    public void updateUpdatedDateTime(LocalDateTime updatedDateTime) {
        this.updatedDateTime = updatedDateTime;
    }

    public void remove() {
        delete();
    }

    public boolean isReserved() {
        return this.status == SaleStatus.RESERVED;
    }

    public boolean isOnSale() {
        return this.status == SaleStatus.ON_SALE;
    }
}
