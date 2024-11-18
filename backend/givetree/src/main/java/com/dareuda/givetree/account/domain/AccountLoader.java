package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.account.controller.AccountErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.common.utils.ListUtils;
import com.dareuda.givetree.finance.domain.MemberFinance;
import com.dareuda.givetree.finance.domain.MemberFinanceReader;
import com.ssafy.finance.client.DemandDepositApiClient;
import com.ssafy.finance.exception.account.AccountNotFoundException;
import com.ssafy.finance.response.demand_deposit.DemandDepositAccountResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AccountLoader {

    private final MemberFinanceReader memberFinanceReader;
    private final DemandDepositApiClient demandDepositApiClient;

    public List<ExternalAccountInfo> loadAccounts(long memberId) {
        MemberFinance memberFinance = memberFinanceReader.read(memberId);
        List<DemandDepositAccountResponse> response = demandDepositApiClient.searchAccounts(memberFinance.getUserKey());
        return ListUtils.applyFunctionToElements(response, ExternalAccountInfo::from);
    }

    public ExternalAccountInfo load(long memberId, String accountNumber) {
        MemberFinance memberFinance = null;
        try {
            memberFinance = memberFinanceReader.read(memberId);
        } catch (AccountNotFoundException e) {
            throw new RestApiException(AccountErrorCode.EXTERNAL_ACCOUNT_NOT_FOUND);
        }
        return ExternalAccountInfo.from(demandDepositApiClient.searchAccount(memberFinance.getUserKey(), accountNumber));
    }

    public long loadAccountBalance(long memberId, String accountNumber) {
        MemberFinance memberFinance = null;
        try {
            memberFinance = memberFinanceReader.read(memberId);
        } catch (AccountNotFoundException e) {
            throw new RestApiException(AccountErrorCode.EXTERNAL_ACCOUNT_NOT_FOUND);
        }
        return demandDepositApiClient.searchAccountBalance(memberFinance.getUserKey(), accountNumber).getAccountBalance();
    }
}
