package com.dareuda.givetree.foundation.controller;

import com.dareuda.givetree.foundation.controller.dto.request.CreateFoundationRequest;
import com.dareuda.givetree.foundation.domain.FoundationDetail;
import com.dareuda.givetree.foundation.service.FoundationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/foundations")
@RequiredArgsConstructor
public class FoundationController {
    private final FoundationService foundationService;

    @PostMapping
    public ResponseEntity<Void> createFoundation(CreateFoundationRequest request) {
        long foundationId = foundationService.createFoundation(request);

        return ResponseEntity.created(
                UriComponentsBuilder
                        .fromPath("/foundations/{foundationId}")
                        .buildAndExpand(foundationId)
                        .toUri()
                )
                .build();
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<FoundationDetail> getFoundation(@PathVariable long memberId) {
        FoundationDetail foundationDetail = foundationService.getFoundationDetailByMemberId(memberId);

        return ResponseEntity.ok(foundationDetail);
    }
}

    /*
        회원
        - 엔티티
        - Repository (CRUD)
        - 서비스 (CRUD)
        - 일반 회원가입 X
        - 컨트롤러 (회원가입빼고)
     */
