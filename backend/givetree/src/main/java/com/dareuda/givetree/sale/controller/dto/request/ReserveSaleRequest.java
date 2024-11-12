package com.dareuda.givetree.sale.controller.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ReserveSaleRequest {

    @NotNull
    private long purchaserId;
}
