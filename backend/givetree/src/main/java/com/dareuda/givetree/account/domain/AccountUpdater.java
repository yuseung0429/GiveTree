package com.dareuda.givetree.account.domain;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class AccountUpdater {

    private final AccountReader accountReader;

    @Transactional
    public void reRegisterAccount(long accountId) {
        Account account = accountReader.read(accountId);
        account.activate();
    }

    @Transactional
    public void unregisterAccount(long accountId) {
        Account account = accountReader.readActiveAccount(accountId);
        account.deactivate();
    }
}
