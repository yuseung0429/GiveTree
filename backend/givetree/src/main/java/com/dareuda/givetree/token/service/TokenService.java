package com.dareuda.givetree.token.service;

import com.dareuda.givetree.history.domain.TransactionInfo;
import com.dareuda.givetree.history.domain.TransactionInfoReader;
import com.dareuda.givetree.token.domain.*;
import com.dareuda.givetree.wallet.domain.Wallet;
import com.dareuda.givetree.wallet.domain.WalletVO;
import com.dareuda.givetree.wallet.domain.member.MemberWalletReader;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final FoundationDonationTokenExchanger foundationDonationTokenExchanger;
    private final MemberWalletReader memberWalletReader;
    private final TokenBalanceLoader tokenBalanceLoader;
    private final CampaignDonationTokenExchanger campaignDonationTokenExchanger;
    private final TransactionInfoReader transactionInfoReader;
    private final FoundationDonationTokenExchangeMessageSender foundationDonationTokenExchangeMessageSender;
    private final CampaignDonationTokenExchangeMessageSender campaignDonationTokenExchangeMessageSender;

    public long loadTokenMemberBalance(long memberId) {
        Wallet wallet = memberWalletReader.readByMemberId(memberId);
        return tokenBalanceLoader.load(WalletVO.from(wallet));
    }

    public void exchangeFoundationDonationToken(long foundationId, List<Long> transactionIds, String simplePassword, String message) {
        long amount = foundationDonationTokenExchanger.exchange(foundationId, transactionIds, simplePassword, message);
        foundationDonationTokenExchangeMessageSender.send(foundationId, amount);
    }

    public void exchangeCampaignDonationToken(long foundationId, List<Long> transactionIds, String simplePassword) {
        long amount = campaignDonationTokenExchanger.exchange(foundationId, transactionIds, simplePassword);
        campaignDonationTokenExchangeMessageSender.send(foundationId, amount);
    }

    public Slice<TransactionInfo> getFoundationDonationTransactionInfos(long foundationId, Pageable pageable) {
        Wallet wallet = memberWalletReader.readByMemberId(foundationId);
        return transactionInfoReader.readUnreceivedFoundationDonation(wallet.getId(), pageable);
    }

    public Slice<TransactionInfo> getCampaignDonationTransactionInfos(long foundationId, Pageable pageable) {
        Wallet wallet = memberWalletReader.readByMemberId(foundationId);
        return transactionInfoReader.readUnreceivedCampaignDonation(wallet.getId(), pageable);
    }
}
