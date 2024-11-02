package com.dareuda.givetree.member.controller;

import com.dareuda.givetree.member.controller.dto.request.CreateMemberRequest;
import com.dareuda.givetree.member.controller.dto.request.UpdateMemberRequest;
import com.dareuda.givetree.member.domain.dto.MemberDetail;
import com.dareuda.givetree.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
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
    public ResponseEntity<Void> updateMember(@Valid @RequestBody UpdateMemberRequest request) {
        memberService.updateMember(1L, request.convertToCommand());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMember() {
        memberService.deleteMember(1L);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberDetail> getMemberDetail(@PathVariable long memberId) {
        MemberDetail memberDetail = memberService.getMemberDetail(memberId);

        return ResponseEntity.ok(memberDetail);
    }
}
