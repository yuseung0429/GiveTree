package com.dareuda.givetree.account.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class AccountTransferResponse {
    private final AccountTransferReceipt senderReceipt;
    private final AccountTransferReceipt receiverReceipt;
}
