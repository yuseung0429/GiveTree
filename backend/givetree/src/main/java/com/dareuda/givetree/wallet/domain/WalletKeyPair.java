package com.dareuda.givetree.wallet.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WalletKeyPair {
    private final String address;
    private final String privateKey;
}