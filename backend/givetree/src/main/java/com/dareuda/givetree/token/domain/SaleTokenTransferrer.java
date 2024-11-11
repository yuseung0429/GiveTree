package com.dareuda.givetree.token.domain;

import com.dareuda.givetree.finance.domain.MemberFinanceValidator;
import com.dareuda.givetree.history.domain.TransactionType;
import com.dareuda.givetree.member.domain.MemberValidator;
import com.dareuda.givetree.wallet.domain.Wallet;
import com.dareuda.givetree.wallet.domain.WalletVO;
import com.dareuda.givetree.wallet.domain.member.MemberWallet;
import com.dareuda.givetree.wallet.domain.member.MemberWalletReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

@Component
@RequiredArgsConstructor
public class SaleTokenTransferrer {

    private final MemberWalletReader memberWalletReader;
    private final MemberFinanceValidator memberFinanceValidator;
    private final TokenTransferrer tokenTransferrer;
    private final MemberValidator memberValidator;

    public void transfer(long senderId, long receiverId, long amount, String simplePassword) {
        memberValidator.validateUser(senderId);
        memberValidator.validateUser(receiverId);

        memberFinanceValidator.validateSimplePassword(senderId, simplePassword);

        MemberWallet senderWallet = memberWalletReader.readByMemberId(senderId);
        MemberWallet receiverWallet = memberWalletReader.readByMemberId(receiverId);

        transferReceiver(senderWallet, receiverWallet, amount);
    }

    public void transfer(long senderId, long receiverId, long foundationId, int donationRate, long amount, String simplePassword) {
        if(donationRate <= 0 || donationRate > 100) {
            throw new IllegalArgumentException("donation rate must be between 1 and 100");
        }

        memberValidator.validateUser(senderId);
        memberValidator.validateUser(receiverId);
        memberValidator.validateFoundation(foundationId);

        memberFinanceValidator.validateSimplePassword(senderId, simplePassword);

        MemberWallet senderWallet = memberWalletReader.readByMemberId(senderId);
        MemberWallet receiverWallet = memberWalletReader.readByMemberId(receiverId);
        MemberWallet foundationWallet = memberWalletReader.readByMemberId(foundationId);

        long amountForFoundation = amount*donationRate/100;
        long amountForReceiver = amount - amountForFoundation;

        transferReceiver(senderWallet, receiverWallet, amountForReceiver);
        transferFoundation(receiverWallet, foundationWallet, amountForFoundation);
    }

    private void transferReceiver(Wallet senderWallet, Wallet receiverWallet, long amount) {
        TransactionReceipt transactionReceipt = tokenTransferrer.transfer(
                WalletVO.from(senderWallet),
                WalletVO.from(receiverWallet),
                amount
        );
        tokenTransferrer.saveTransaction(
                senderWallet.getId(),
                receiverWallet.getId(),
                amount,
                TransactionType.SALE,
                transactionReceipt
        );
    }

    private void transferFoundation(Wallet receiverWallet, Wallet foundationWallet, long amount) {
        TransactionReceipt transactionReceipt = tokenTransferrer.transfer(
                WalletVO.from(receiverWallet),
                WalletVO.from(foundationWallet),
                amount
        );
        tokenTransferrer.saveTransaction(
                receiverWallet.getId(),
                foundationWallet.getId(),
                amount,
                TransactionType.FOUNDATION_DONATION,
                transactionReceipt
        );
    }
}
