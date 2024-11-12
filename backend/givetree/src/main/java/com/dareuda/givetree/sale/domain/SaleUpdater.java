package com.dareuda.givetree.sale.domain;

import com.dareuda.givetree.foundation.domain.FoundationReader;
import com.dareuda.givetree.media.domain.ImageAppender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Component
public class SaleUpdater {

    private final SaleReader saleReader;
    private final SaleValidator saleValidator;
    private final FoundationReader foundationReader;
    private final ImageAppender imageAppender;

    @Transactional
    public void update(long memberId, long saleId, SaleCommand command) {
        Sale sale = saleReader.read(saleId);
        saleValidator.validateOwner(memberId, sale);
        saleValidator.validatePriceDoesNotExceedContribution(command.getPrice(), command.getContribution());

        Long foundationId = command.getFoundationId();
        if (foundationId != null && foundationReader.isExist(foundationId)) {
            sale.updateFoundationId(command.getFoundationId());
        }
        sale.updatePriceAndContribution(command.getPrice(), command.getContribution());
        sale.updateTitle(command.getTitle());
        sale.updateDescription(command.getDescription());
        sale.updateStatus(command.getStatus());
        sale.updateProductionCondition(command.getProductionCondition());
        sale.updateIsDirectSale(command.getIsDirectSale());
        sale.updateIsDeliverySale(command.getIsDeliverySale());

        List<String> imageUrls = command.getImageUrls();
        if (imageUrls != null) {
            List<SaleImage> newImages= imageUrls.stream()
                    .map(imageAppender::append)
                    .map(image -> new SaleImage(sale, image))
                    .toList();
            sale.updateImages(newImages);
        }

        sale.updateUpdatedDateTime(LocalDateTime.now());
    }
}
