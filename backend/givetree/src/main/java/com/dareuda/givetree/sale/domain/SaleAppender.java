package com.dareuda.givetree.sale.domain;

import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.media.domain.ImageAppender;
import com.dareuda.givetree.sale.infrastructure.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Component
public class SaleAppender {

    private final ImageAppender imageAppender;
    private final SaleRepository saleRepository;

    public void append(long memberId, SaleCommand command) {
        List<Image> images = command.getImageUrls().stream()
                .map(imageAppender::append)
                .toList();

        Sale sale = Sale.builder()
                .sellerId(memberId)
                .fundedFoundationId(command.getFoundationId())
                .price(command.getPrice())
                .donationRate(command.getDonationRate())
                .title(command.getTitle())
                .description(command.getDescription())
                .status(command.getStatus())
                .productionCondition(command.getProductionCondition())
                .isDirectSale(command.isDirectSale())
                .isDeliverySale(command.isDeliverySale())
                .updatedDateTime(LocalDateTime.now())
                .build();

        images.stream()
                .map(image -> new SaleImage(sale, image))
                .forEach(sale.getImages()::add);

        saleRepository.save(sale);
    }
}
