package com.dareuda.givetree.account.service;

import com.dareuda.givetree.account.domain.AccountLoader;
import com.dareuda.givetree.account.domain.AccountRegistrar;
import com.dareuda.givetree.account.domain.ExternalAccountInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountLoader accountLoader;
    private final AccountRegistrar accountRegistrar;

    public List<ExternalAccountInfo> getExternalAccounts(long memberId) {
        return accountLoader.loadAccounts(memberId);
    }

    public ExternalAccountInfo getExternalAccount(long memberId, String accountNo) {
        return accountLoader.load(memberId, accountNo);
    }

    public void registerAccount(long memberId, String accountNo, String password) {
        accountRegistrar.register(memberId, accountNo, password);
    }
}