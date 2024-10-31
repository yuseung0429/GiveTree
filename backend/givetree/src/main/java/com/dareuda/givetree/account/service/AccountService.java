package com.dareuda.givetree.account.service;

import com.dareuda.givetree.account.domain.AccountLoader;
import com.dareuda.givetree.account.domain.ExternalAccountInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountLoader accountLoader;

    public List<ExternalAccountInfo> getAccounts(long memberId) {
        return accountLoader.loadAccounts(memberId);
    }

    public ExternalAccountInfo getAccount(long memberId, String accountNo) {
        return accountLoader.load(memberId, accountNo);
    }
}