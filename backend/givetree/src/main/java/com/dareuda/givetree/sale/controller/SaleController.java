package com.dareuda.givetree.sale.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.sale.controller.dto.SaleDtoConverter;
import com.dareuda.givetree.sale.controller.dto.request.AppendSaleRequest;
import com.dareuda.givetree.sale.controller.dto.request.ReadSalesBySearchRequest;
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
}
