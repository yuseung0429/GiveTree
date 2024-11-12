package com.dareuda.givetree.sale.domain;

import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.media.domain.ImageAppender;
import com.dareuda.givetree.sale.infrastructure.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Component
public class SaleAppender {

    private final ImageAppender imageAppender;
    private final SaleRepository saleRepository;

    public void append(long memberId, SaleCommand command) {
        Sale sale = Sale.builder()
                .sellerId(memberId)
                .fundedFoundationId(command.getFoundationId())
                .price(command.getPrice())
                .donationRate(command.getDonationRate())
                .title(command.getTitle())
                .description(command.getDescription())
                .status(command.getStatus())
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
