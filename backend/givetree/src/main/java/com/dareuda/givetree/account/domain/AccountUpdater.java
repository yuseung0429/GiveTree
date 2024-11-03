package com.dareuda.givetree.account.domain;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class AccountUpdater {

    private final AccountReader accountReader;

    @Transactional
    public void reRegisterAccount(long accountId, String simplePassword, String salt) {
        Account account = accountReader.read(accountId);
        account.changeSimplePassword(simplePassword);
        account.changeSalt(salt);
        account.activate();
    }
}
