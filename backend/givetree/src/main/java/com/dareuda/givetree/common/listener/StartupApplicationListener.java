package com.dareuda.givetree.common.listener;

import com.dareuda.givetree.account.domain.Bank;
import com.dareuda.givetree.account.domain.BankLoader;
import com.dareuda.givetree.account.domain.BankReader;
import com.dareuda.givetree.account.domain.BankRegistrar;
import com.dareuda.givetree.campaign.domain.dto.CreateCampaignCommand;
import com.dareuda.givetree.campaign.infrastructure.CampaignRepository;
import com.dareuda.givetree.campaign.service.CampaignService;
import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.common.utils.ListUtils;
import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.foundation.domain.dto.CreateFoundationCommand;
import com.dareuda.givetree.foundation.infrastructure.FoundationRepository;
import com.dareuda.givetree.foundation.service.FoundationService;
import com.dareuda.givetree.member.domain.Role;
import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import com.dareuda.givetree.member.infrastructure.MemberRepository;
import com.dareuda.givetree.member.service.MemberService;
import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import com.ssafy.finance.response.bank.BankCodeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
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

    private static final long DEFAULT_MEMBER_COUNT = 2;

    private static final String FOUNDATION_DUMMY_JSON_ARRAY = """
            [
              {
                "email": "foundation1@example.com",
                "password": "test123",
                "name": "사랑의 열매",
                "profileImageUrl": "https://cdn.pixabay.com/photo/2024/08/25/12/33/seagull-8996395_1280.jpg",
                "introduction": "사랑의 열매 재단입니다.",
                "corporateRegistrationNumber": "012-34-56789",
                "phoneNumber": "010-1234-5678",
                "address": "구미 진평동",
                "titleImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/InflatableBalloons.jpg/460px-InflatableBalloons.jpg",
                "imageUrls": [
                "https://cdn.pixabay.com/photo/2023/11/05/08/41/hot-air-balloon-8366532_1280.jpg",
                "https://cdn.pixabay.com/photo/2017/08/01/23/32/colorful-2568654_1280.jpg"
                ],
                "categories": [
                "불우이웃"
                ]
              },
              {
                "email": "foundation2@example.com",
                "password": "test123",
                "name": "초록우산",
                "profileImageUrl": "https://cdn.pixabay.com/photo/2024/08/25/12/33/seagull-8996395_1280.jpg",
                "introduction": "초록우산 재단입니다.",
                "corporateRegistrationNumber": "012-34-56789",
                "phoneNumber": "010-1234-5678",
                "address": "구미 진평동",
                "titleImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/InflatableBalloons.jpg/460px-InflatableBalloons.jpg",
                "imageUrls": [
                "https://cdn.pixabay.com/photo/2023/11/05/08/41/hot-air-balloon-8366532_1280.jpg",
                "https://cdn.pixabay.com/photo/2017/08/01/23/32/colorful-2568654_1280.jpg"
                ],
                "categories": [
                "교육"
                ]
              },
              {
                "email": "foundation3@example.com",
                "password": "test123",
                "name": "굿네이버스",
                "profileImageUrl": "https://cdn.pixabay.com/photo/2024/08/25/12/33/seagull-8996395_1280.jpg",
                "introduction": "굿네이버스 재단입니다.",
                "corporateRegistrationNumber": "012-34-56789",
                "phoneNumber": "010-1234-5678",
                "address": "구미 진평동",
                "titleImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/InflatableBalloons.jpg/460px-InflatableBalloons.jpg",
                "imageUrls": [
                  "https://cdn.pixabay.com/photo/2023/11/05/08/41/hot-air-balloon-8366532_1280.jpg",
                  "https://cdn.pixabay.com/photo/2017/08/01/23/32/colorful-2568654_1280.jpg"
                ],
                "categories": [
                  "불우이웃"
                ]
              },
              {
                "email": "foundation4@example.com",
                "password": "test123",
                "name": "대한적십자사",
                "profileImageUrl": "https://cdn.pixabay.com/photo/2024/08/25/12/33/seagull-8996395_1280.jpg",
                "introduction": "대한적십자사 재단입니다.",
                "corporateRegistrationNumber": "012-34-56789",
                "phoneNumber": "010-1234-5678",
                "address": "구미 진평동",
                "titleImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/InflatableBalloons.jpg/460px-InflatableBalloons.jpg",
                "imageUrls": [
                  "https://cdn.pixabay.com/photo/2023/11/05/08/41/hot-air-balloon-8366532_1280.jpg",
                  "https://cdn.pixabay.com/photo/2017/08/01/23/32/colorful-2568654_1280.jpg"
                ],
                "categories": [
                  "구호",
                  "불우이웃"
                ]
              }
            ]
            """;
    private static final String CAMPAIGN_DUMMY_JSON_ARRAY = """
            [
              {
                "foundationName": "사랑의 열매",
                "name": "희망 나눔 캠페인",
                "currentFundraisingAmount": 5400000,
                "targetFundraisingAmount": 15000000,
                "titleImageUrl": "/images/campaign/poster.png",
                "startDate": "2024-01-01",
                "endDate": "2024-12-31",
                "introduction": "어려운 이웃에게 희망을 전달하는 사랑의 열매 캠페인입니다.",
                "imageUrls": [
                  "/images/campaign/introducePoster.png",
                  "/images/campaign/poster.png"
                ]
              },
              {
                "foundationName": "초록우산",
                "name": "미래 꿈나무 지원 캠페인",
                "currentFundraisingAmount": 12000000,
                "targetFundraisingAmount": 20000000,
                "titleImageUrl": "/images/campaign/poster2.png",
                "startDate": "2024-03-01",
                "endDate": "2024-09-30",
                "introduction": "미래를 이끌어 갈 아이들에게 더 나은 교육과 환경을 지원합니다.",
                "imageUrls": [
                  "/images/campaign/introducePoster2.png",
                  "/images/campaign/poster2.png"
                ]
              },
              {
                "foundationName": "굿네이버스",
                "name": "소외계층 지원 캠페인",
                "currentFundraisingAmount": 7500000,
                "targetFundraisingAmount": 10000000,
                "titleImageUrl": "/images/campaign/poster3.png",
                "startDate": "2024-05-01",
                "endDate": "2024-11-10",
                "introduction": "경제적 어려움을 겪는 저소득층 분들에게 따뜻한 손길을 내밀어 주세요.",
                "imageUrls": [
                  "/images/campaign/introducePoster.png",
                  "/images/campaign/poster3.png"
                ]
              },
              {
                "foundationName": "대한적십자사",
                "name": "아나바다 캠페인",
                "currentFundraisingAmount": 3000000,
                "targetFundraisingAmount": 5000000,
                "titleImageUrl": "/images/campaign/poster4.png",
                "startDate": "2024-06-15",
                "endDate": "2024-11-14",
                "introduction": "물품을 아껴쓰고 나눠쓰고 바꿔쓰는 캠페인입니다.",
                "imageUrls": [
                  "/images/campaign/introducePoster2.png",
                  "/images/campaign/poster4.png"
                ]
              }
            ]
            """;

    private final CampaignService campaignService;
    private final CampaignRepository campaignRepository;
    private final FoundationRepository foundationRepository;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        initializeBankCode();
        initializeDataSql();
        createTestMembers();
        createFoundations();
        createCampaigns();
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
        for (int i = 1; i <= DEFAULT_MEMBER_COUNT; i++) {
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
    }

    private void createFoundations() {
        JsonArray jsonArray = JsonParser.parseString(FOUNDATION_DUMMY_JSON_ARRAY).getAsJsonArray();
        for (int i=0; i< jsonArray.size(); i++) {
            JsonObject jsonObject = jsonArray.get(i).getAsJsonObject();

            String email = jsonObject.get("email").getAsString();
            String password = jsonObject.get("password").getAsString();
            String name = jsonObject.get("name").getAsString();
            String profileImageUrl = jsonObject.get("profileImageUrl").getAsString();
            String introduction = jsonObject.get("introduction").getAsString();
            String corporateRegistrationNumber = jsonObject.get("corporateRegistrationNumber").getAsString();
            String phoneNumber = jsonObject.get("phoneNumber").getAsString();
            String address = jsonObject.get("address").getAsString();
            String titleImageUrl = jsonObject.get("titleImageUrl").getAsString();
            List<String> imageUrls = new ArrayList<>();
            jsonObject.get("imageUrls")
                    .getAsJsonArray()
                    .forEach(e -> imageUrls.add(e.getAsString()));
            List<String> categories = new ArrayList<>();
            jsonObject.get("categories")
                    .getAsJsonArray()
                    .forEach(e -> categories.add(e.getAsString()));

            if (memberRepository.findByEmail(email).isPresent()) {
                continue;
            }

            CreateFoundationCommand command = CreateFoundationCommand.builder()
                    .createMemberCommand(CreateMemberCommand.builder()
                            .email(email)
                            .password(password)
                            .name(name)
                            .profileImageUrl(profileImageUrl)
                            .role(Role.FOUNDATION)
                            .build())
                    .introduction(introduction)
                    .corporateRegistrationNumber(corporateRegistrationNumber)
                    .phoneNumber(phoneNumber)
                    .address(address)
                    .titleImageUrl(titleImageUrl)
                    .imageUrls(imageUrls)
                    .categories(categories)
                    .build();

            foundationService.createFoundation(command);
        }
    }

    private void createCampaigns() {
        JsonArray jsonArray = JsonParser.parseString(CAMPAIGN_DUMMY_JSON_ARRAY).getAsJsonArray();
        for (int i=0; i< jsonArray.size(); i++) {
            JsonObject jsonObject = jsonArray.get(i).getAsJsonObject();

            String foundationName = jsonObject.get("foundationName").getAsString();
            String name = jsonObject.get("name").getAsString();
            String introduction = jsonObject.get("introduction").getAsString();
            LocalDate startDate = LocalDate.parse(jsonObject.get("startDate").getAsString());
            LocalDate endDate = LocalDate.parse(jsonObject.get("endDate").getAsString());
            long targetFundraisingAmount = jsonObject.get("targetFundraisingAmount").getAsLong();
            String titleImageUrl = jsonObject.get("titleImageUrl").getAsString();

            List<String> imageUrls = new ArrayList<>();
            jsonObject.get("imageUrls")
                    .getAsJsonArray()
                    .forEach(e -> imageUrls.add(e.getAsString()));

            if (campaignRepository.findByName(name).isPresent()) {
                throw new RestApiException(CommonErrorCode.RESOURCE_CONFLICT, "해당 이름의 캠페인이 이미 존재합니다.");
            }
            Foundation foundation = foundationRepository.findByName(foundationName)
                    .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND, "해당 이름의 재단을 찾을 수 없습니다"));

            CreateCampaignCommand command = CreateCampaignCommand.builder()
                    .name(name)
                    .introduction(introduction)
                    .startDate(startDate)
                    .endDate(endDate)
                    .targetFundraisingAmount(targetFundraisingAmount)
                    .titleImageUrl(titleImageUrl)
                    .imageUrls(imageUrls)
                    .build();

            campaignService.createCampaign(foundation.getId(), command);
        }
    }
}
