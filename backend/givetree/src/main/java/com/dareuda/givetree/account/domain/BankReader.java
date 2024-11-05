package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.account.controller.BankErrorCode;
import com.dareuda.givetree.account.infrastructure.BankRepository;
import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class BankReader {

    private final BankRepository bankRepository;

    public Bank read(String code) {
        return bankRepository.findByCode(code)
                .orElseThrow(() -> new RestApiException(BankErrorCode.BANK_NOT_FOUND));
    }

    public List<Bank> readAll() {
        return bankRepository.findAll();
    }
}
