package com.dareuda.givetree.history.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.history.controller.TransactionErrorCode;
import com.dareuda.givetree.history.infrastructure.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TransactionReader {

    private final TransactionRepository transactionRepository;

    public Transaction read(long transactionId) {
        return transactionRepository.findById(transactionId)
                .orElseThrow(()-> new RestApiException(TransactionErrorCode.TRANSACTION_NOT_FOUND));
    }

    public List<Transaction> readAll(List<Long> transactionIds) {
        return transactionRepository.findByIds(transactionIds);
    }

    public List<Transaction> readUnreceivedFoundationDonationWithInTransactionIds(long receiverWalletId, List<Long> transactionIds) {
        return transactionRepository
                .findUnreceivedFoundationDonationTransactionByReceiverWalletIdAndTransactionIds(
                        receiverWalletId,
                        transactionIds
                );
    }

    public Slice<Transaction> readUnreceivedFoundationDonation(long receiverWalletId, Pageable pageable) {
        return transactionRepository
                .findUnreceivedFoundationDonationTransactionByReceiverWalletId(
                        receiverWalletId,
                        pageable
                );
    }

    public List<Transaction> readUnreceivedCampaignDonationWithInTransactionIds(long receiverWalletId, List<Long> transactionIds) {
        return transactionRepository
                .findUnreceivedCampaignDonationTransactionByReceiverWalletIdAndTransactionIds(
                        receiverWalletId,
                        transactionIds
                );
    }

    public Slice<Transaction> readUnreceivedCampaignDonation(long receiverWalletId, Pageable pageable) {
        return transactionRepository
                .findUnreceivedCampaignDonationTransactionByReceiverWalletId(
                        receiverWalletId,
                        pageable
                );
    }
}
