package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.common.config.AdminConfig;
import com.dareuda.givetree.ledger.domain.LedgerAppender;
import com.dareuda.givetree.ledger.domain.LedgerType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class RefundProcessor {

    private final AccountReader accountReader;
    private final AdminConfig adminConfig;
    private final TransferExecutor transferExecutor;
    private final LedgerAppender ledgerAppender;

    public long process(long receiverId, long amount) {
        AccountTransferResponse response = transferExecutor.execute(
                adminConfig.getMemberId(),
                adminConfig.getSimplePassword(),
                receiverId,
                amount,
                LedgerType.REFUND.getWithdrawalMessage(),
                LedgerType.REFUND.getDepositMessage()
        );

        Account receiverAccount = accountReader.read(receiverId);

        return ledgerAppender.append(receiverAccount.getId(), amount, LedgerType.REFUND, response.getSenderReceipt().getTransactionDate().atStartOfDay());
    }
}
