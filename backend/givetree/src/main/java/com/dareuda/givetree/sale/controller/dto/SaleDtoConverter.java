package com.dareuda.givetree.sale.controller.dto;

import com.dareuda.givetree.sale.controller.dto.response.ReadSaleBySearchResponse;
import com.dareuda.givetree.sale.domain.SaleDetail;

import java.util.List;

public class SaleDtoConverter {

    public static List<ReadSaleBySearchResponse> convert(List<SaleDetail> saleDetails) {
        return saleDetails.stream()
                .map(ReadSaleBySearchResponse::from)
                .toList();
    }
}
