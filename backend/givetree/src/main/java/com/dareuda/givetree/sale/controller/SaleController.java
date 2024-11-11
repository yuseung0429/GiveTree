package com.dareuda.givetree.sale.controller;

import com.dareuda.givetree.sale.controller.dto.SaleDtoConverter;
import com.dareuda.givetree.sale.controller.dto.request.ReadSalesBySearchRequest;
import com.dareuda.givetree.sale.controller.dto.response.ReadSaleBySearchResponse;
import com.dareuda.givetree.sale.controller.dto.response.ReadSaleResponse;
import com.dareuda.givetree.sale.domain.SaleDetail;
import com.dareuda.givetree.sale.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
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
        ReadSalesBySearchRequest readSalesBySearchRequest,
        Pageable pageable
    ) {
        List<SaleDetail> result = saleService.readSalesBySearch(readSalesBySearchRequest.toSalesSearchQuery(), pageable);
        return ResponseEntity.ok().body(SaleDtoConverter.convert(result));
    }
}
