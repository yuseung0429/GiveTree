package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.common.utils.ListUtils;
import com.dareuda.givetree.finance.domain.MemberFinance;
import com.dareuda.givetree.finance.domain.MemberFinanceReader;
import com.dareuda.givetree.finance.domain.MemberFinanceValidator;
import com.ssafy.finance.client.DemandDepositApiClient;
import com.ssafy.finance.enums.TransactionType;
import com.ssafy.finance.response.demand_deposit.DemandDepositAccountTransferResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TransferExecutor {

    private final AccountReader accountReader;
    private final MemberFinanceReader memberFinanceReader;
    private final MemberFinanceValidator memberFinanceValidator;

    private final DemandDepositApiClient apiClient;

    public AccountTransferResponse execute(
            long senderId,
            String senderSimplePassword,
            long receiverId,
            long amount,
            String senderAccountSummary,
            String receiverAccountSummary
    ) {
        memberFinanceValidator.validateSimplePassword(senderId, senderSimplePassword);

        Account senderAccount = accountReader.readActiveAccount(senderId);
        Account receiverAccount = accountReader.readActiveAccount(receiverId);

        MemberFinance senderFinance = memberFinanceReader.read(senderId);

        List<DemandDepositAccountTransferResponse> response = apiClient.transferAccount(
                senderFinance.getUserKey(),
                receiverAccount.getAccountNumber(),
                amount,
                senderAccount.getAccountNumber(),
                receiverAccountSummary,
                senderAccountSummary
        );

        List<AccountTransferReceipt> receipts = ListUtils.applyFunctionToElements(
                response,
                AccountTransferReceipt::from
        );

        AccountTransferReceipt senderReceipt = receipts.get(0).getTransactionType() == TransactionType.WITHDRAWAL ?
                receipts.get(0) : receipts.get(1);

        AccountTransferReceipt receiverReceipt = receipts.get(0).getTransactionType() == TransactionType.DEPOSIT ?
                receipts.get(0) : receipts.get(1);

        return new AccountTransferResponse(senderReceipt, receiverReceipt);
    }
}