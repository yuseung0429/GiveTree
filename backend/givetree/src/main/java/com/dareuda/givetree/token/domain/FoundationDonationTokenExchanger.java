package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.finance.domain.MemberFinanceValidator;
import com.dareuda.givetree.history.controller.TransactionErrorCode;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.history.domain.TransactionLedgerAppender;
import com.dareuda.givetree.history.domain.TransactionReader;
import com.dareuda.givetree.member.domain.MemberValidator;
import com.dareuda.givetree.wallet.domain.member.MemberWallet;
import com.dareuda.givetree.wallet.domain.member.MemberWalletReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FoundationDonationTokenExchanger {

    private final TokenExchanger tokenExchanger;
    private final MemberFinanceValidator memberFinanceValidator;
    private final MemberValidator memberValidator;
    private final TransactionReader transactionReader;
    private final MemberWalletReader memberWalletReader;
    private final TransactionLedgerAppender transactionLedgerAppender;

    public long exchange(long foundationId, List<Long> transactionIds, String simplePassword, String message) {
        memberValidator.validateFoundation(foundationId);
        memberFinanceValidator.validateSimplePassword(foundationId, simplePassword);

        MemberWallet foundationWallet = memberWalletReader.readByMemberId(foundationId);
        List<Transaction> transactions = transactionReader.readUnreceivedFoundationDonationWithInTransactionIds(
                foundationWallet.getId(),
                transactionIds
        );

        if (transactions.size() != transactionIds.size()) {
            throw new RestApiException(TransactionErrorCode.TRANSACTION_ALREADY_PROCESSED);
        }

        long totalAmount = 0;
        for (Transaction transaction : transactions) {
            totalAmount += transaction.getAmount();
        }

        long ledgerId = tokenExchanger.exchange(foundationId, totalAmount, message);
        transactionLedgerAppender.appendAll(transactionIds, ledgerId);

        return totalAmount;
    }
}
