package com.dareuda.givetree.account.domain;

import com.ssafy.finance.client.BankApiClient;
import com.ssafy.finance.response.bank.BankCodeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class BankLoader {

    private final BankApiClient bankApiClient;

    public List<BankCodeResponse> loadBankCodes(){
        return bankApiClient.searchCodes();
    }
}
