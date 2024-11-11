package com.dareuda.givetree.finance.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.finance.controller.request.MemberFinanceAppendRequest;
import com.dareuda.givetree.finance.controller.request.MemberFinanceUpdateRequest;
import com.dareuda.givetree.finance.service.MemberFinanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/finance")
@RequiredArgsConstructor
public class MemberFinanceController {

    private final MemberFinanceService memberFinanceService;

    @PostMapping
    public ResponseEntity<?> appendMemberFinance(@AuthenticationPrincipal UserPrinciple user,
                                                 @RequestBody MemberFinanceAppendRequest request) {
        memberFinanceService.appendMemberFinance(user.getId(), request.getSimplePassword());
        return ResponseEntity.ok().body(null);
    }

    @PutMapping
    public ResponseEntity<?> updateMemberFinance(@AuthenticationPrincipal UserPrinciple user,
                                                 @RequestBody MemberFinanceUpdateRequest request) {
        memberFinanceService.updateMemberFinance(user.getId(), request.getSimplePassword());
        return ResponseEntity.ok().body(null);
    }
}
