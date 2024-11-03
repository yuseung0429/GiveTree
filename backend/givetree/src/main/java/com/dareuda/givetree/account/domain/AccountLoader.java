package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.common.utils.ListUtils;
import com.dareuda.givetree.finance.domain.MemberFinanceInfo;
import com.dareuda.givetree.finance.domain.MemberFinanceInfoReader;
import com.ssafy.finance.client.DemandDepositApiClient;
import com.ssafy.finance.exception.account.AccountNotFoundException;
import com.ssafy.finance.response.demand_deposit.DemandDepositAccountResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AccountLoader {

    private final MemberFinanceInfoReader financeInfoReader;
    private final DemandDepositApiClient demandDepositApiClient;

    public List<ExternalAccountInfo> loadAccounts(long memberId) {
        MemberFinanceInfo info = financeInfoReader.read(memberId);
        List<DemandDepositAccountResponse> response = demandDepositApiClient.searchAccounts(info.getUserKey());
        return ListUtils.applyFunctionToElements(response, ExternalAccountInfo::from);
    }

    public ExternalAccountInfo load(long memberId, String accountNo) {
        MemberFinanceInfo info = null;
        try {
            info = financeInfoReader.read(memberId);
        } catch (AccountNotFoundException e) {
            throw new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND);
        }
        return ExternalAccountInfo.from(demandDepositApiClient.searchAccount(info.getUserKey(), accountNo));
    }
}
