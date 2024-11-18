package com.dareuda.givetree.account.service;

import com.dareuda.givetree.account.domain.*;
import com.dareuda.givetree.finance.domain.RequiredMemberFinance;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountReader accountReader;
    private final AccountInfoReader accountInfoReader;
    private final AccountLoader accountLoader;
    private final AccountRegistrar accountRegistrar;
    private final AccountUpdater accountUpdater;

    @RequiredMemberFinance
    public AccountInfo getRegisteredAccount(long memberId) {
        return accountInfoReader.readActiveAccountInfo(memberId);
    }

    @RequiredMemberFinance
    public long getRegisteredAccountBalance(long memberId) {
        Account account = accountReader.readActiveAccount(memberId);
        return accountLoader.loadAccountBalance(memberId, account.getAccountNumber());
    }

    @RequiredMemberFinance
    public ExternalAccountInfo getExternalAccount(long memberId, String accountNumber) {
        return accountLoader.load(memberId, accountNumber);
    }

    @RequiredMemberFinance
    public List<ExternalAccountInfo> getExternalAccounts(long memberId) {
        return accountLoader.loadAccounts(memberId);
    }

    @RequiredMemberFinance
    public void registerAccount(long memberId, String accountNumber) {
        accountRegistrar.register(memberId, accountNumber);
    }

    @RequiredMemberFinance
    public void unregisterAccount(long memberId) {
        accountUpdater.unregisterAccount(memberId);
    }
}