package com.dareuda.givetree.history.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.history.domain.LedgerInfo;
import com.dareuda.givetree.history.service.LedgerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ledgers")
public class LedgerController {

    private final LedgerService ledgerService;

    @GetMapping
    public ResponseEntity<?> getMemberLedgerInfos(@AuthenticationPrincipal UserPrinciple user,
                                                  Pageable pageable) {
        Page<LedgerInfo> pages = ledgerService.getMemberLedgerInfos(user.getId(), pageable);
        return ResponseEntity.ok().body(pages);
    }
}
