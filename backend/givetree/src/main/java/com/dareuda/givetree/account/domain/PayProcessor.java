package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.common.config.AdminConfig;
import com.dareuda.givetree.ledger.domain.Ledger;
import com.dareuda.givetree.ledger.domain.LedgerAppender;
import com.dareuda.givetree.ledger.domain.LedgerType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class PayProcessor {

    private final AccountReader accountReader;
    private final AdminConfig adminConfig;
    private final TransferExecutor transferExecutor;
    private final LedgerAppender ledgerAppender;

    public long process(long senderId, long amount, String simplePassword) {
        AccountTransferResponse response = transferExecutor.execute(
                senderId,
                simplePassword,
                adminConfig.getMemberId(),
                amount,
                LedgerType.CHARGE.getWithdrawalMessage(),
                LedgerType.CHARGE.getDepositMessage()
        );

        Account senderAccount = accountReader.read(senderId);

        return ledgerAppender.append(senderAccount.getId(), amount, LedgerType.CHARGE, response.getSenderReceipt().getTransactionDate().atStartOfDay());
    }
}
