package com.dareuda.givetree.sale.controller.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ReadBookerResponse {

    public Long bookerId;

    public static ReadBookerResponse of(Long bookerId) {
        return new ReadBookerResponse(bookerId);
    }
}
