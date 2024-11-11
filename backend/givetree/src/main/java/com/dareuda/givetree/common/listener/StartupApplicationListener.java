package com.dareuda.givetree.common.listener;

import com.dareuda.givetree.account.domain.Bank;
import com.dareuda.givetree.account.domain.BankLoader;
import com.dareuda.givetree.account.domain.BankReader;
import com.dareuda.givetree.account.domain.BankRegistrar;
import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.common.utils.ListUtils;
import com.dareuda.givetree.member.domain.MemberCreator;
import com.dareuda.givetree.member.domain.Role;
import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import com.ssafy.finance.response.bank.BankCodeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class StartupApplicationListener implements ApplicationListener<ContextRefreshedEvent> {

    private final BankLoader bankLoader;
    private final BankReader bankReader;
    private final BankRegistrar bankRegistrar;
    private final JdbcTemplate jdbcTemplate;
    private final MemberCreator memberCreator;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        initializeBankCode();
        initializeDataSql();
    }

    private void initializeBankCode() {
        List<BankCodeResponse> response = bankLoader.loadBankCodes();
        List<Bank> banks = bankReader.readAll();
        Set<String> set = new HashSet<>(ListUtils.applyFunctionToElements(banks, Bank::getCode));

        List<Bank> banksToSave = new ArrayList<>();
        for (BankCodeResponse element : response) {
            if (set.contains(element.getBankCode()))
                continue;
            banksToSave.add(new Bank(element.getBankCode(), element.getBankName()));
        }

        bankRegistrar.registerBanks(banksToSave);
    }

    private void initializeDataSql() {
        Resource resource = new ClassPathResource("data.sql");
        try {
            ScriptUtils.executeSqlScript(jdbcTemplate.getDataSource().getConnection(), resource);
        } catch (Exception e) {
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }
}
