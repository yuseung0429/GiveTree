package com.dareuda.givetree.sale.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.sale.controller.dto.SaleDtoConverter;
import com.dareuda.givetree.sale.controller.dto.request.*;
import com.dareuda.givetree.sale.controller.dto.response.ReadSaleBySearchResponse;
import com.dareuda.givetree.sale.controller.dto.response.ReadSaleResponse;
import com.dareuda.givetree.sale.domain.SaleDetail;
import com.dareuda.givetree.sale.service.SaleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/sales")
@RequiredArgsConstructor
@RestController
public class SaleController {

    private final SaleService saleService;

    @GetMapping("/{saleId}")
    public ResponseEntity<ReadSaleResponse> readSale(@PathVariable long saleId) {
        return ResponseEntity.ok().body(ReadSaleResponse.from(saleService.readSale(saleId)));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ReadSaleBySearchResponse>> readSalesBySearch(
        ReadSalesBySearchRequest request,
        @PageableDefault Pageable pageable
    ) {
        List<SaleDetail> result = saleService.readSalesBySearch(request.toSalesSearchQuery(), pageable);
        return ResponseEntity.ok().body(SaleDtoConverter.convert(result));
    }

    @PostMapping
    public ResponseEntity<Void> appendSale(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @RequestBody @Valid AppendSaleRequest request
    ) {
        saleService.appendSale(userPrinciple.getId(), request.toCommand());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{saleId}")
    public ResponseEntity<Void> updateSale(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @PathVariable long saleId,
            @RequestBody @Valid UpdateSaleRequest request
    ) {
        saleService.updateSale(userPrinciple.getId(), saleId, request.toCommand());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{saleId}")
    public ResponseEntity<Void> removeSale(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @PathVariable long saleId
    ) {
        saleService.removeSale(userPrinciple.getId(), saleId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{saleId}/reserve")
    public ResponseEntity<Void> reserveSale(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @PathVariable long saleId,
            @RequestBody @Valid ReserveSaleRequest request
    ) {
        saleService.reserveSale(userPrinciple.getId(), request.getPurchaserId(), saleId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{saleId}/cancel-reserve")
    public ResponseEntity<Void> cancelReservation(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @PathVariable long saleId
    ) {
        saleService.cancelReservation(userPrinciple.getId(), saleId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{saleId}/is-current-user-reserved")
    public ResponseEntity<Boolean> isCurrentUserReserved(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @PathVariable long saleId
    ) {
        return ResponseEntity.ok().body(saleService.isCurrentUserReserved(userPrinciple.getId(), saleId));
    }

    @PostMapping("/{saleId}/pay")
    public ResponseEntity<Void> processPayment(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @PathVariable long saleId,
            @RequestBody @Valid ProcessPaymentRequest request
    ) {
        saleService.processPayment(userPrinciple.getId(), saleId, request.getSimplePassword());
        return ResponseEntity.ok().build();
    }
}
