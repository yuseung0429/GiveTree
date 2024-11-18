package com.dareuda.givetree.sale.domain;

import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Getter
@RequiredArgsConstructor
public enum ProductionCondition {

    LIKE_NEW("거의 새 것"),
    UNOPENED("미개봉"),
    USED("사용감 있음"),
    ;

    private final String title;

    public static ProductionCondition of(String desc) {
        return Arrays.stream(ProductionCondition.values())
                .filter(v -> v.getTitle().equals(desc))
                .findAny()
                .orElseThrow(() -> new RestApiException(CommonErrorCode.INVALID_ARGUMENT));
    }
}
