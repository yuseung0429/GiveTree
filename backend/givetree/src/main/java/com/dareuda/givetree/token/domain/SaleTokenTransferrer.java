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
    private final TokenCharger tokenCharger;
    private final TokenExchanger tokenExchanger;

    public void transfer(long senderId, long receiverId, long amount, String simplePassword, String message) {
        memberValidator.validateUser(senderId);
        memberValidator.validateUser(receiverId);

        memberFinanceValidator.validateSimplePassword(senderId, simplePassword);

        tokenCharger.charge(senderId, amount, message);

        MemberWallet senderWallet = memberWalletReader.readByMemberId(senderId);
        MemberWallet receiverWallet = memberWalletReader.readByMemberId(receiverId);

        transferReceiver(senderWallet, receiverWallet, amount);
    }

    public void transfer(long senderId, long receiverId, long foundationId, long amount, long donationAmount, String simplePassword, String message) {
        if(amount < donationAmount) {
            throw new IllegalArgumentException("amount > donationAmount");
        }

        memberValidator.validateUser(senderId);
        memberValidator.validateUser(receiverId);
        memberValidator.validateFoundation(foundationId);

        memberFinanceValidator.validateSimplePassword(senderId, simplePassword);

        tokenCharger.charge(senderId, amount, message);

        MemberWallet senderWallet = memberWalletReader.readByMemberId(senderId);
        MemberWallet receiverWallet = memberWalletReader.readByMemberId(receiverId);
        MemberWallet foundationWallet = memberWalletReader.readByMemberId(foundationId);

        transferReceiver(senderWallet, receiverWallet, amount - donationAmount);
        tokenExchanger.exchange(receiverId, amount - donationAmount, message);
        transferFoundation(receiverWallet, foundationWallet, donationAmount);
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
