package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.finance.domain.MemberFinanceValidator;
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
    private final MemberFinanceValidator memberFinanceValidator;
    private final MemberValidator memberValidator;
    private final TokenCharger tokenCharger;

    public long transfer(long userId, long foundationId, long amount, String simplePassword, String message) {
        memberValidator.validateUser(userId);
        memberValidator.validateFoundation(foundationId);

        memberFinanceValidator.validateSimplePassword(userId, simplePassword);

        MemberWallet memberWallet = memberWalletReader.readByMemberId(userId);
        MemberWallet foundationWallet = memberWalletReader.readByMemberId(foundationId);

        tokenCharger.charge(userId, amount, message);

        TransactionReceipt receipt = tokenTransferrer.transfer(
                WalletVO.from(memberWallet),
                WalletVO.from(foundationWallet),
                amount
        );
        return tokenTransferrer.saveTransaction(
                memberWallet.getId(),
                foundationWallet.getId(),
                amount,
                TransactionType.FOUNDATION_DONATION,
                receipt
        ).getId();
    }

    public long transfer(long memberId, long foundationId, long amount, String message) {
        memberValidator.validateUser(memberId);
        memberValidator.validateFoundation(foundationId);

        MemberWallet memberWallet = memberWalletReader.readByMemberId(memberId);
        MemberWallet foundationWallet = memberWalletReader.readByMemberId(foundationId);

        tokenCharger.charge(memberId, amount, message);

        TransactionReceipt receipt = tokenTransferrer.transfer(
                WalletVO.from(memberWallet),
                WalletVO.from(foundationWallet),
                amount
        );
        return tokenTransferrer.saveTransaction(
                memberWallet.getId(),
                foundationWallet.getId(),
                amount,
                TransactionType.FOUNDATION_DONATION,
                receipt
        ).getId();
    }
}