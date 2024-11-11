package com.dareuda.givetree.token.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.token.controller.request.TokenFoundationExchangeRequest;
import com.dareuda.givetree.token.controller.request.TokenUserChargeRequest;
import com.dareuda.givetree.token.controller.request.TokenUserExchangeRequest;
import com.dareuda.givetree.token.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/tokens")
@RequiredArgsConstructor
public class TokenController {

    private final TokenService tokenService;

    @GetMapping("/balance")
    public ResponseEntity<?> getTokenBalance(@AuthenticationPrincipal UserPrinciple user) {
        long balance = tokenService.loadTokenMemberBalance(user.getId());
        return ResponseEntity.ok().body(Map.of("balance", balance));
    }

    @PostMapping("/user/charge")
    public ResponseEntity<?> chargeUserToken(@AuthenticationPrincipal UserPrinciple user,
                                             @RequestBody TokenUserChargeRequest request) {
        tokenService.chargeUserToken(user.getId(), request.getAmount(), request.getSimplePassword());
        return ResponseEntity.ok().body(null);
    }

    @PostMapping("/user/exchange")
    public ResponseEntity<?> exchangeUserToken(@AuthenticationPrincipal UserPrinciple user,
                                               @RequestBody TokenUserExchangeRequest request) {
        tokenService.exchangeUserToken(user.getId(), request.getAmount(), request.getSimplePassword());
        return ResponseEntity.ok().body(null);
    }

    @PostMapping("/foundation/exchange")
    public ResponseEntity<?> exchangeFoundationToken(@AuthenticationPrincipal UserPrinciple user,
                                                     @RequestBody TokenFoundationExchangeRequest request) {
        tokenService.exchangeFoundationToken(user.getId(), request.getTransactionIds(), request.getSimplePassword());
        return ResponseEntity.ok().body(null);
    }
}
