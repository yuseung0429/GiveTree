package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.account.infrastructure.AccountRepository;
import com.dareuda.givetree.common.utils.SHA256Utils;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AccountRegistrar {

    private final MemberReader memberReader;
    private final SHA256Utils sha256Utils;
    private final AccountValidator accountValidator;
    private final AccountLoader accountLoader;
    private final BankReader bankReader;
    private final AccountReader accountReader;
    private final AccountUpdater accountUpdater;
    private final AccountRepository accountRepository;

    public void register(long memberId, String accountNumber, String password) {
        accountValidator.validateRegisterable(memberId);

        ExternalAccountInfo info = accountLoader.load(memberId, accountNumber);
        accountValidator.validateExpired(info.getExpiryAt());

        String salt = sha256Utils.generate();
        String simplePassword = sha256Utils.generate(password + salt);

        Optional<Account> optAccount = accountReader.readOptionalByAccountNumber(accountNumber);
        if (optAccount.isPresent()) {
            accountUpdater.reRegisterAccount(optAccount.get().getId(), simplePassword, salt);
            return;
        }

        Member member = memberReader.read(memberId);
        Bank bank = bankReader.read(info.getBankCode());

        Account account = Account.builder()
                .accountNumber(info.getAccountNumber())
                .member(member)
                .name(info.getName())
                .createdAt(info.getCreatedAt())
                .expiryAt(info.getExpiryAt())
                .isActive(true)
                .simplePassword(simplePassword)
                .salt(salt)
                .bank(bank)
                .build();
        accountRepository.save(account);
    }
}
