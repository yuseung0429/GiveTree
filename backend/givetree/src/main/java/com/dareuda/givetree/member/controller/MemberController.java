package com.dareuda.givetree.member.controller;

import com.dareuda.givetree.auth.domain.UserPrinciple;
import com.dareuda.givetree.member.controller.dto.request.CreateMemberRequest;
import com.dareuda.givetree.member.controller.dto.request.UpdateMemberRequest;
import com.dareuda.givetree.member.domain.dto.MemberDetail;
import com.dareuda.givetree.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<Void> createMember(@Valid @RequestBody CreateMemberRequest request) {
        long memberId = memberService.createMember(request.convertToCommand());

        return ResponseEntity.created(
                        UriComponentsBuilder
                                .fromPath("/members/{memberId}")
                                .buildAndExpand(memberId)
                                .toUri()
                )
                .build();
    }

    @PatchMapping
    public ResponseEntity<Void> updateMember(
            @AuthenticationPrincipal UserPrinciple userPrinciple,
            @Valid @RequestBody UpdateMemberRequest request
    ) {
        memberService.updateMember(userPrinciple.getId(), request.convertToCommand());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMember(@AuthenticationPrincipal UserPrinciple userPrinciple) {
        memberService.deleteMember(userPrinciple.getId());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/session")
    public ResponseEntity<MemberDetail> getMemberDetail(@AuthenticationPrincipal UserPrinciple userPrinciple) {
        MemberDetail memberDetail = memberService.getMemberDetail(userPrinciple.getId());

        return ResponseEntity.ok().body(memberDetail);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberDetail> getMemberDetail(@PathVariable long memberId) {
        MemberDetail memberDetail = memberService.getMemberDetail(memberId);

        return ResponseEntity.ok(memberDetail);
    }
}
