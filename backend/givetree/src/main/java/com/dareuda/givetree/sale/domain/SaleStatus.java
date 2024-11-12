package com.dareuda.givetree.sale.domain;

import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Getter
@RequiredArgsConstructor
public enum SaleStatus {

    ON_SALE("판매중"),
    RESERVED("예약중"),
    SOLD("판매완료"),
    ;

    private final String title;

    public static SaleStatus of(String desc) {
        return Arrays.stream(SaleStatus.values())
                .filter(v -> v.getTitle().equals(desc))
                .findAny()
                .orElseThrow(() -> new RestApiException(CommonErrorCode.INVALID_ARGUMENT));
    }
}
