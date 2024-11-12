package com.dareuda.givetree.common.listener;

import com.dareuda.givetree.account.domain.Bank;
import com.dareuda.givetree.account.domain.BankLoader;
import com.dareuda.givetree.account.domain.BankReader;
import com.dareuda.givetree.account.domain.BankRegistrar;
import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.common.utils.ListUtils;
import com.dareuda.givetree.foundation.domain.dto.CreateFoundationCommand;
import com.dareuda.givetree.foundation.service.FoundationService;
import com.dareuda.givetree.member.domain.Role;
import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import com.dareuda.givetree.member.infrastructure.MemberRepository;
import com.dareuda.givetree.member.service.MemberService;
import com.ssafy.finance.response.bank.BankCodeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class StartupApplicationListener implements ApplicationListener<ContextRefreshedEvent> {
    private final BankLoader bankLoader;
    private final BankReader bankReader;
    private final BankRegistrar bankRegistrar;
    private final JdbcTemplate jdbcTemplate;
    private final MemberService memberService;
    private final FoundationService foundationService;
    private final MemberRepository memberRepository;

    private static final long defaultMemberCount = 1;
    private static final long defaultFoundationCount = 5;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        initializeBankCode();
        initializeDataSql();
        createTestMembers();
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

    private void createTestMembers() {
        for (int i = 1; i <= defaultMemberCount; i++) {
            String email = "member" + i + "@example.com";
            if (memberRepository.existsByEmail(email)) {
                continue;
            }

            memberService.createMember(
                    CreateMemberCommand.builder()
                            .email(email)
                            .password("test123")
                            .name("테스트 회원 " + i)
                            .role(Role.USER)
                            .build()
            );
        }

        for (int i = 1; i <= defaultFoundationCount; i++) {
            String email = "foundation" + i + "@example.com";
            if (memberRepository.existsByEmail(email)) {
                continue;
            };

            foundationService.createFoundation(
                    CreateFoundationCommand.builder()
                            .createMemberCommand(CreateMemberCommand.builder()
                                    .email(email)
                                    .password("test123")
                                    .name("테스트 재단 " + i)
                                    .role(Role.FOUNDATION)
                                    .build())
                            .introduction(i + "번 재단 소개입니다.")
                            .corporateRegistrationNumber("012-34-56789")
                            .phoneNumber("010-1234-5678")
                            .address("구미 진평동")
                            .titleImageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/InflatableBalloons.jpg/460px-InflatableBalloons.jpg")
                            .imageUrls(List.of("https://cdn.pixabay.com/photo/2023/11/05/08/41/hot-air-balloon-8366532_1280.jpg", "https://cdn.pixabay.com/photo/2017/08/01/23/32/colorful-2568654_1280.jpg"))
                            .categories(List.of("CategoryA", "CategoryB", "CategoryC"))
                            .build()
            );
        }
    }
}
