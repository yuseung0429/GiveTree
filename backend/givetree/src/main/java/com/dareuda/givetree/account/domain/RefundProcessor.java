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
public class RefundProcessor {

    private final AccountReader accountReader;
    private final AdminConfig adminConfig;
    private final TransferExecutor transferExecutor;
    private final LedgerAppender ledgerAppender;

    public AccountTransferResponse process(long receiverId, long amount) {
        return transferExecutor.execute(
                adminConfig.getMemberId(),
                receiverId,
                amount,
                LedgerType.REFUND.getWithdrawalMessage(),
                LedgerType.REFUND.getDepositMessage()
        );
    }

    @Transactional
    public Ledger saveLedger(long receiverId, long amount, String message) {
        Account receiverAccount = accountReader.read(receiverId);
        return ledgerAppender.append(
                receiverAccount.getId(),
                amount,
                LedgerType.REFUND,
                message
        );
    }
}
