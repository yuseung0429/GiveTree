package com.dareuda.givetree.foundation.controller;

import com.dareuda.givetree.foundation.controller.dto.request.UpdateFoundationRequest;
import com.dareuda.givetree.foundation.controller.dto.request.CreateFoundationRequest;
import com.dareuda.givetree.foundation.domain.FoundationDetail;
import com.dareuda.givetree.foundation.service.FoundationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/foundations")
@RequiredArgsConstructor
public class FoundationController {
    private final FoundationService foundationService;
    private final static long TEMP_MEMBER_ID = 1L;

    @PostMapping
    public ResponseEntity<Void> createFoundation(@Valid @RequestBody CreateFoundationRequest request) {
        long foundationId = foundationService.createFoundation(TEMP_MEMBER_ID, request.convertToCommand());

        return ResponseEntity.created(
                UriComponentsBuilder
                        .fromPath("/foundations/{foundationId}")
                        .buildAndExpand(foundationId)
                        .toUri()
                )
                .build();
    }

    @PatchMapping("/{foundationId}")
    public ResponseEntity<Void> updateFoundation(@PathVariable long foundationId, @Valid @RequestBody UpdateFoundationRequest request) {
        foundationService.updateFoundation(TEMP_MEMBER_ID, foundationId, request.convertToCommand());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{foundationId}")
    public ResponseEntity<Void> deleteFoundation(@PathVariable long foundationId) {
        foundationService.deleteFoundation(TEMP_MEMBER_ID, foundationId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{foundationId}")
    public ResponseEntity<FoundationDetail> getFoundation(@PathVariable long foundationId) {
        FoundationDetail foundationDetail = foundationService.getFoundationDetail(foundationId);

        return ResponseEntity.ok(foundationDetail);
    }

    @GetMapping
    public ResponseEntity<FoundationDetail> getSessionFoundation() {
        FoundationDetail foundationDetail = foundationService.getFoundationDetailByMemberId(TEMP_MEMBER_ID);

        return ResponseEntity.ok(foundationDetail);
    }
}
