package com.dareuda.givetree.foundation.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.foundation.controller.dto.request.UpdateFoundationRequest;
import com.dareuda.givetree.foundation.controller.dto.request.CreateFoundationRequest;
import com.dareuda.givetree.foundation.domain.FoundationDetail;
import com.dareuda.givetree.foundation.service.FoundationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/foundations")
@RequiredArgsConstructor
public class FoundationController {
    private final FoundationService foundationService;

    @PostMapping
    public ResponseEntity<Void> createFoundation(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @Valid @RequestBody CreateFoundationRequest request
    ) {
        long foundationId = foundationService.createFoundation(userPrinciple.getId(), request.convertToCommand());

        return ResponseEntity.created(
                UriComponentsBuilder
                        .fromPath("/foundations/{foundationId}")
                        .buildAndExpand(foundationId)
                        .toUri()
                )
                .build();
    }

    @PatchMapping("/{foundationId}")
    public ResponseEntity<Void> updateFoundation(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @PathVariable long foundationId,
            @Valid @RequestBody UpdateFoundationRequest request
    ) {
        foundationService.updateFoundation(userPrinciple.getId(), foundationId, request.convertToCommand());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{foundationId}")
    public ResponseEntity<Void> deleteFoundation(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @PathVariable long foundationId
    ) {
        foundationService.deleteFoundation(userPrinciple.getId(), foundationId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{foundationId}")
    public ResponseEntity<FoundationDetail> getFoundation(@PathVariable long foundationId) {
        FoundationDetail foundationDetail = foundationService.getFoundationDetail(foundationId);

        return ResponseEntity.ok(foundationDetail);
    }

    @GetMapping
    public ResponseEntity<FoundationDetail> getSessionFoundation(@AuthenticationPrincipal UserPrinciple userPrinciple) {
        FoundationDetail foundationDetail = foundationService.getFoundationDetailByMemberId(userPrinciple.getId());

        return ResponseEntity.ok(foundationDetail);
    }
}
