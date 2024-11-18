package com.dareuda.givetree.finance.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.finance.controller.request.MemberFinanceAppendRequest;
import com.dareuda.givetree.finance.controller.request.MemberFinanceUpdateRequest;
import com.dareuda.givetree.finance.controller.request.SimplePasswordVerifyRequest;
import com.dareuda.givetree.finance.service.MemberFinanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/finance")
@RequiredArgsConstructor
public class MemberFinanceController {

    private final MemberFinanceService memberFinanceService;

    @GetMapping("/exists")
    public ResponseEntity<?> existsMemberFinance(@AuthenticationPrincipal UserPrinciple user) {
        boolean exists = memberFinanceService.existsMemberFinance(user.getId());
        return ResponseEntity.ok().body(Map.of("exists", exists));
    }

    @PostMapping("/simple-password/valid")
    public ResponseEntity<?> validSimplePassword(@AuthenticationPrincipal UserPrinciple user,
                                                  @RequestBody SimplePasswordVerifyRequest request) {
        boolean isValid = memberFinanceService.validSimplePassword(user.getId(), request.getSimplePassword());
        return ResponseEntity.ok().body(Map.of("isValid", isValid));
    }

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
