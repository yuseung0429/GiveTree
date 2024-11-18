package com.dareuda.givetree.account.controller;

import com.dareuda.givetree.account.controller.request.AccountRegisterRequest;
import com.dareuda.givetree.account.domain.AccountInfo;
import com.dareuda.givetree.account.domain.ExternalAccountInfo;
import com.dareuda.givetree.account.service.AccountService;
import com.dareuda.givetree.auth.domain.UserPrinciple;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping
    public ResponseEntity<?> getAccounts(@AuthenticationPrincipal UserPrinciple user) {
        List<ExternalAccountInfo> infos = accountService.getExternalAccounts(user.getId());
        return ResponseEntity.ok().body(infos);
    }

    @GetMapping("/registered")
    public ResponseEntity<?> getRegisteredAccount(@AuthenticationPrincipal UserPrinciple user) {
        AccountInfo info = accountService.getRegisteredAccount(user.getId());
        return ResponseEntity.ok().body(info);
    }

    @GetMapping("/registered/balance")
    public ResponseEntity<?> getRegisteredAccountBalance(@AuthenticationPrincipal UserPrinciple user) {
        long balance = accountService.getRegisteredAccountBalance(user.getId());
        return ResponseEntity.ok().body(Map.of("balance", balance));
    }

    @GetMapping("/{accountNumber}")
    public ResponseEntity<?> getExternalAccount(@AuthenticationPrincipal UserPrinciple user,
                                                @PathVariable String accountNumber) {
        ExternalAccountInfo info = accountService.getExternalAccount(user.getId(), accountNumber);
        return ResponseEntity.ok().body(info);
    }

    @PostMapping("/registered")
    public ResponseEntity<?> registerAccount(@AuthenticationPrincipal UserPrinciple user,
                                             @RequestBody AccountRegisterRequest request) {
        accountService.registerAccount(user.getId(), request.getAccountNumber());
        return ResponseEntity.ok().body(null);
    }

    @DeleteMapping("/registered")
    public ResponseEntity<?> registerAccount(@AuthenticationPrincipal UserPrinciple user) {
        accountService.unregisterAccount(user.getId());
        return ResponseEntity.ok().body(null);
    }
}
