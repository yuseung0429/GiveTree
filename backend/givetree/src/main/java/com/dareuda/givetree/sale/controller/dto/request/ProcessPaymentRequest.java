package com.dareuda.givetree.sale.controller.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class ProcessPaymentRequest {

    @NotBlank
    private String simplePassword;
}
