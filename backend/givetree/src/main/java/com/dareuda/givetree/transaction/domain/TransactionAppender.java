package com.dareuda.givetree.transaction.domain;

import com.dareuda.givetree.ledger.domain.LedgerReader;
import com.dareuda.givetree.transaction.infrastructure.TransactionRepository;
import com.dareuda.givetree.wallet.domain.WalletReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TransactionAppender {

    private final WalletReader walletReader;
    private final LedgerReader ledgerReader;
    private final TransactionRepository transactionRepository;


    public void append(long senderWalletId, long receiverWalletId, long amount, String transactionHash, long ledgerId) {
        transactionRepository.save(Transaction.builder()
                .senderWallet(walletReader.read(senderWalletId))
                .receiverWallet(walletReader.read(receiverWalletId))
                .ledger(ledgerReader.read(ledgerId))
                .amount(amount)
                .transactionHash(transactionHash)
                .build());
    }

    public void append(long senderWalletId, long receiverWalletId, long amount, String transactionHash) {
        transactionRepository.save(Transaction.builder()
                .senderWallet(walletReader.read(senderWalletId))
                .receiverWallet(walletReader.read(receiverWalletId))
                .ledger(null)
                .amount(amount)
                .transactionHash(transactionHash)
                .build());
    }
}
