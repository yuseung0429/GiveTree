package com.dareuda.givetree.foundation.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.foundation.controller.dto.request.SearchFoundationRequest;
import com.dareuda.givetree.foundation.controller.dto.request.UpdateFoundationRequest;
import com.dareuda.givetree.foundation.controller.dto.request.CreateFoundationRequest;
import com.dareuda.givetree.foundation.domain.FoundationDetail;
import com.dareuda.givetree.foundation.service.FoundationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api/foundations")
@RequiredArgsConstructor
public class FoundationController {
    private final FoundationService foundationService;

    @PostMapping
    public ResponseEntity<Void> createFoundation(
            @Valid @RequestBody CreateFoundationRequest request
    ) {
        long foundationId = foundationService.createFoundation(request.convertToCommand());

        return ResponseEntity.created(
                UriComponentsBuilder
                        .fromPath("/foundations/{foundationId}")
                        .buildAndExpand(foundationId)
                        .toUri()
                )
                .build();
    }

    @PatchMapping
    public ResponseEntity<Void> updateFoundation(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @Valid @RequestBody UpdateFoundationRequest request
    ) {
        foundationService.updateFoundation(userPrinciple.getId(), request.convertToCommand());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{foundationId}")
    public ResponseEntity<FoundationDetail> getFoundation(@PathVariable long foundationId) {
        FoundationDetail foundationDetail = foundationService.getFoundationDetail(foundationId);

        return ResponseEntity.ok(foundationDetail);
    }

    @GetMapping("/session")
    public ResponseEntity<FoundationDetail> getSessionFoundation(@AuthenticationPrincipal UserPrinciple userPrinciple) {
        FoundationDetail foundationDetail = foundationService.getFoundationDetail(userPrinciple.getId());

        return ResponseEntity.ok(foundationDetail);
    }

    @GetMapping
    public ResponseEntity<Page<FoundationDetail>> searchFoundations(
            SearchFoundationRequest request,
            @PageableDefault Pageable pageable
    ) {
        Page<FoundationDetail> foundationDetails = foundationService.searchFoundationDetail(request.convertToSearchFilter(), pageable);

        return ResponseEntity.ok(foundationDetails);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllFoundationCategories() {
        List<String> categories = foundationService.getAllCategories();

        return ResponseEntity.ok(categories);
    }
}
