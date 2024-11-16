package com.dareuda.givetree.sale.domain;

import com.dareuda.givetree.media.domain.ImageAppender;
import com.dareuda.givetree.sale.infrastructure.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Component
public class SaleAppender {

    private final SaleValidator saleValidator;
    private final ImageAppender imageAppender;
    private final SaleRepository saleRepository;

    @Transactional
    public void append(long memberId, SaleCommand command) {
        saleValidator.validatePriceDoesNotExceedContribution(command.getPrice(), command.getContribution());

        Sale sale = Sale.builder()
                .sellerId(memberId)
                .fundedFoundationId(command.getFoundationId())
                .price(command.getPrice())
                .contribution(command.getContribution())
                .title(command.getTitle())
                .description(command.getDescription())
                .status(SaleStatus.ON_SALE)
                .productionCondition(command.getProductionCondition())
                .isDirectSale(command.getIsDirectSale())
                .isDeliverySale(command.getIsDeliverySale())
                .updatedDateTime(LocalDateTime.now())
                .build();

        List<String> imageUrls = command.getImageUrls();
        if (imageUrls != null) {
            List<SaleImage> images = imageUrls.stream()
                    .map(imageAppender::append)
                    .map(image -> new SaleImage(sale, image))
                    .toList();
            sale.getImages().addAll(images);
        }

        saleRepository.save(sale);
    }
}
