package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.finance.domain.MemberFinanceValidator;
import com.dareuda.givetree.history.controller.TransactionErrorCode;
import com.dareuda.givetree.history.domain.*;
import com.dareuda.givetree.history.infrastructure.TransactionLedgerRepository;
import com.dareuda.givetree.member.domain.MemberValidator;
import com.dareuda.givetree.wallet.domain.member.MemberWallet;
import com.dareuda.givetree.wallet.domain.member.MemberWalletReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FoundationTokenExchanger {

    private final TokenExchanger tokenExchanger;
    private final MemberFinanceValidator memberFinanceValidator;
    private final TransactionLedgerReader transactionLedgerReader;
    private final MemberValidator memberValidator;
    private final TransactionReader transactionReader;
    private final MemberWalletReader memberWalletReader;
    private final TransactionLedgerRepository transactionLedgerRepository;
    private final TransactionLedgerAppender transactionLedgerAppender;

    public void exchange(long foundationId, String simplePassword, List<Long> transactionIds) {
        memberValidator.validateFoundation(foundationId);
        memberFinanceValidator.validateSimplePassword(foundationId, simplePassword);

        MemberWallet foundationWallet = memberWalletReader.readByMemberId(foundationId);
        List<Transaction> transactions = transactionReader.readUnreceivedTransactionByReceiverWalletIdAndTransactionIds(
                foundationWallet.getId(),
                transactionIds
        );

        if (transactions.size() != transactionIds.size()) {
            throw new RestApiException(TransactionErrorCode.TRANSACTION_ALREADY_PROCESSED);
        }

        long amount = 0;

        for (Transaction transaction : transactions) {
            amount += transaction.getAmount();
        }

        long ledgerId =  tokenExchanger.exchange(foundationId, amount);
        transactionLedgerAppender.appendAll(transactionIds, ledgerId);
    }
}
