package com.dareuda.givetree.wallet.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Objects;

@Getter
@AllArgsConstructor
public class WalletVO {
    private final String address;
    private final String privateKey;

    public static WalletVO from(Wallet wallet) {
        return new WalletVO(wallet.getAddress(), wallet.getPrivateKey());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WalletVO walletVO = (WalletVO) o;
        return address.equals(walletVO.address) && privateKey.equals(walletVO.privateKey);
    }

    @Override
    public int hashCode() {
        return Objects.hash(address, privateKey);
    }
}
