package com.dareuda.givetree.token.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TokenUserChargeRequest {
    private Long amount;
    private String simplePassword;
}
