package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.donation.domain.FoundationDonationAppender;
import com.dareuda.givetree.donation.domain.FoundationDonationType;
import com.dareuda.givetree.finance.domain.MemberFinanceValidator;
import com.dareuda.givetree.history.domain.Transaction;
import com.dareuda.givetree.history.domain.TransactionType;
import com.dareuda.givetree.member.domain.MemberValidator;
import com.dareuda.givetree.wallet.domain.WalletVO;
import com.dareuda.givetree.wallet.domain.member.MemberWallet;
import com.dareuda.givetree.wallet.domain.member.MemberWalletReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

@Component
@RequiredArgsConstructor
public class FoundationDonationTokenTransferrer {

    private final TokenTransferrer tokenTransferrer;
    private final MemberWalletReader memberWalletReader;
    private final MemberValidator memberValidator;
    private final FoundationDonationAppender foundationDonationAppender;

    public void transfer(long userId, long foundationId, long amount, FoundationDonationType donationType) {
        memberValidator.validateUser(userId);
        memberValidator.validateFoundation(foundationId);

        MemberWallet memberWallet = memberWalletReader.readByMemberId(userId);
        MemberWallet foundationWallet = memberWalletReader.readByMemberId(foundationId);

        TransactionReceipt receipt = tokenTransferrer.transfer(
                WalletVO.from(memberWallet),
                WalletVO.from(foundationWallet),
                amount
        );

        Transaction transaction = tokenTransferrer.saveTransaction(
                memberWallet.getId(),
                foundationWallet.getId(),
                amount,
                TransactionType.FOUNDATION_DONATION,
                receipt
        );

        foundationDonationAppender.append(
                userId,
                foundationId,
                amount,
                transaction.getId(),
                donationType
        );
    }
}