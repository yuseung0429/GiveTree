package com.dareuda.givetree.admin;

import com.dareuda.givetree.finance.domain.MemberFinance;
import com.dareuda.givetree.finance.domain.MemberFinanceReader;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import com.ssafy.finance.client.DemandDepositApiClient;
import com.ssafy.finance.response.demand_deposit.DemandDepositAccountCreateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admins")
public class AdminController {

    private final DemandDepositApiClient demandDepositApiClient;
    private final MemberFinanceReader memberFinanceReader;
    private final MemberReader memberReader;

    @PostMapping("/accounts")
    public ResponseEntity<?> createAccount(@RequestBody AccountCreateRequest request) {
        Member member = memberReader.readByEmail(request.getEmail());
        MemberFinance memberFinance = memberFinanceReader.read(member.getId());
        DemandDepositAccountCreateResponse response = demandDepositApiClient.createAccount(memberFinance.getUserKey(), request.getAccountTypeUniqueNo());
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/accounts/charge")
    public ResponseEntity<?> chargeMoney(@RequestBody AccountChargeRequest request) {
        Member member = memberReader.readByEmail(request.getEmail());
        MemberFinance memberFinance = memberFinanceReader.read(member.getId());
        demandDepositApiClient.depositAccount(memberFinance.getUserKey(), request.getAccountNo(), request.getAmount(), "Test 입금");
        return ResponseEntity.ok().build();
    }
}
