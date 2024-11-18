package com.dareuda.givetree.account.domain;

import com.dareuda.givetree.account.infrastructure.AccountRepository;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AccountRegistrar {

    private final MemberReader memberReader;
    private final AccountValidator accountValidator;
    private final AccountLoader accountLoader;
    private final BankReader bankReader;
    private final AccountReader accountReader;
    private final AccountUpdater accountUpdater;
    private final AccountRepository accountRepository;

    public void register(long memberId, String accountNumber) {
        accountValidator.validateRegisterable(memberId);

        ExternalAccountInfo info = accountLoader.load(memberId, accountNumber);
        accountValidator.validateExpired(info.getExpiryAt());

        Optional<Account> optAccount = accountReader.readOptionalByAccountNumber(accountNumber);
        if (optAccount.isPresent()) {
            accountUpdater.reRegisterAccount(optAccount.get().getId());
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
                .bank(bank)
                .build();
        accountRepository.save(account);
    }
}
