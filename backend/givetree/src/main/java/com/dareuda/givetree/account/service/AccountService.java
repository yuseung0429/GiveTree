package com.dareuda.givetree.account.service;

import com.dareuda.givetree.account.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountReader accountReader;
    private final AccountLoader accountLoader;
    private final AccountRegistrar accountRegistrar;

    public AccountInfo getRegisteredAccount(long memberId) {
        return AccountInfo.from(accountReader.readActiveAccount(memberId));
    }

    public long getRegisteredAccountBalance(long memberId) {
        Account account = accountReader.readActiveAccount(memberId);
        return accountLoader.loadAccountBalance(memberId, account.getAccountNumber());
    }

    public ExternalAccountInfo getExternalAccount(long memberId, String accountNo) {
        return accountLoader.load(memberId, accountNo);
    }

    public List<ExternalAccountInfo> getExternalAccounts(long memberId) {
        return accountLoader.loadAccounts(memberId);
    }

    public void registerAccount(long memberId, String accountNo) {
        accountRegistrar.register(memberId, accountNo);
    }
}