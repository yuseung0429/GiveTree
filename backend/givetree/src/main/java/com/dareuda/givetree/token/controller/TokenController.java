package com.dareuda.givetree.token.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.history.domain.TransactionInfo;
import com.dareuda.givetree.token.controller.request.TokenCampaignDonationExchangeRequest;
import com.dareuda.givetree.token.controller.request.TokenFoundationDonationExchangeRequest;
import com.dareuda.givetree.token.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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

    @GetMapping("/donations/foundations")
    public ResponseEntity<?> getFoundationDonationTransactionInfos(@AuthenticationPrincipal UserPrinciple user,
                                                    Pageable pageable) {
        Slice<TransactionInfo> infos = tokenService.getFoundationDonationTransactionInfos(user.getId(), pageable);
        return ResponseEntity.ok().body(infos);
    }

    @GetMapping("/donations/campaigns")
    public ResponseEntity<?> getCampaignDonationTransactionInfos(@AuthenticationPrincipal UserPrinciple user,
                                                                   Pageable pageable) {
        Slice<TransactionInfo> infos = tokenService.getCampaignDonationTransactionInfos(user.getId(), pageable);
        return ResponseEntity.ok().body(infos);
    }


    @PostMapping("/donations/foundations/exchange")
    public ResponseEntity<?> exchangeFoundationDonationToken(@AuthenticationPrincipal UserPrinciple user,
                                                             @RequestBody TokenFoundationDonationExchangeRequest request) {
        tokenService.exchangeFoundationDonationToken(
                user.getId(),
                request.getTransactionIds(),
                request.getSimplePassword(),
                request.getMessage()
        );
        return ResponseEntity.ok().body(null);
    }

    @PostMapping("/donations/campaigns/exchange")
    public ResponseEntity<?> exchangeCampaignDonationToken(@AuthenticationPrincipal UserPrinciple user,
                                                           @RequestBody TokenCampaignDonationExchangeRequest request) {
        tokenService.exchangeCampaignDonationToken(
                user.getId(),
                request.getTransactionIds(),
                request.getSimplePassword()
        );
        return ResponseEntity.ok().body(null);
    }
}
