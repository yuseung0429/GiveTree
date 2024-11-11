package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.common.config.AdminConfig;
import com.dareuda.givetree.history.domain.Ledger;
import com.dareuda.givetree.history.domain.LedgerAppender;
import com.dareuda.givetree.history.domain.LedgerType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class DepositProcessor {

    private final AccountReader accountReader;
    private final AdminConfig adminConfig;
    private final TransferExecutor transferExecutor;
    private final LedgerAppender ledgerAppender;

    public AccountTransferResponse process(long senderId, long amount) {
        return transferExecutor.execute(
                senderId,
                adminConfig.getMemberId(),
                amount,
                LedgerType.CHARGE.getWithdrawalMessage(),
                LedgerType.CHARGE.getDepositMessage()
        );
    }

    @Transactional
    public Ledger saveLedger(long senderId, long amount, AccountTransferResponse response) {
        Account senderAccount = accountReader.read(senderId);
        return ledgerAppender.append(
                senderAccount.getId(),
                amount,
                LedgerType.CHARGE,
                response.getSenderReceipt().getTransactionDate().atStartOfDay()
        );
    }
}
