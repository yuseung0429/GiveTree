package com.dareuda.givetree.sale.domain;

import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import org.springframework.stereotype.Component;

@Component
public class SaleValidator {

    public void validateOwner(long memberId, Sale sale) {
        if (sale.getSellerId() != memberId) {
            throw new RestApiException(CommonErrorCode.FORBIDDEN);
        }
    }
}
