package com.dareuda.givetree.history.domain;

import com.dareuda.givetree.history.infrastructure.TransactionRepository;
import com.dareuda.givetree.wallet.domain.WalletReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TransactionAppender {

    private final WalletReader walletReader;
    private final TransactionRepository transactionRepository;

    public Transaction append(long senderWalletId, long receiverWalletId, long amount, TransactionType type, String transactionHash) {
        return transactionRepository.save(Transaction.builder()
                .senderWallet(walletReader.read(senderWalletId))
                .receiverWallet(walletReader.read(receiverWalletId))
                .amount(amount)
                .type(type)
                .transactionHash(transactionHash)
                .build()
        );
    }
}
