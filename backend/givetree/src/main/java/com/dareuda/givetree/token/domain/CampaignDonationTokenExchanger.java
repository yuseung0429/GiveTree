package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.finance.domain.MemberFinanceValidator;
import com.dareuda.givetree.history.controller.TransactionErrorCode;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.history.domain.TransactionLedgerAppender;
import com.dareuda.givetree.history.domain.TransactionReader;
import com.dareuda.givetree.member.domain.MemberValidator;
import com.dareuda.givetree.wallet.domain.campaign.CampaignWallet;
import com.dareuda.givetree.wallet.domain.member.MemberWallet;
import com.dareuda.givetree.wallet.domain.member.MemberWalletReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CampaignDonationTokenExchanger {

    private final TokenExchanger tokenExchanger;
    private final MemberFinanceValidator memberFinanceValidator;
    private final MemberValidator memberValidator;
    private final TransactionReader transactionReader;
    private final MemberWalletReader memberWalletReader;
    private final TransactionLedgerAppender transactionLedgerAppender;

    public long exchange(long foundationId, List<Long> transactionIds, String simplePassword) {
        memberValidator.validateFoundation(foundationId);
        memberFinanceValidator.validateSimplePassword(foundationId, simplePassword);

        MemberWallet foundationWallet = memberWalletReader.readByMemberId(foundationId);
        List<Transaction> transactions = transactionReader.readUnreceivedCampaignDonationWithInTransactionIds(
                foundationWallet.getId(),
                transactionIds
        );

        if (transactions.size() != transactionIds.size()) {
            throw new RestApiException(TransactionErrorCode.TRANSACTION_ALREADY_PROCESSED);
        }

        long totalAmount = 0;

        for (Transaction transaction : transactions) {
            CampaignWallet campaignWallet = (CampaignWallet) transaction.getSenderWallet();
            long ledgerId = tokenExchanger.exchange(foundationId, transaction.getAmount(), campaignWallet.getCampaign().getName());
            transactionLedgerAppender.append(transaction.getId(), ledgerId);
            totalAmount += transaction.getAmount();
        }

        return totalAmount;
    }
}
