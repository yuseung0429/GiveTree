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
@RequestMapping("/api/members")
public class MemberController {
    private final MemberService memberService;
    private static final long TEMP_MEMBER_ID = 1L;

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
        memberService.updateMember(TEMP_MEMBER_ID, request.convertToCommand());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMember() {
        memberService.deleteMember(TEMP_MEMBER_ID);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/session")
    public ResponseEntity<MemberDetail> getMemberDetail() {
        MemberDetail memberDetail = memberService.getMemberDetail(TEMP_MEMBER_ID);

        return ResponseEntity.ok().body(memberDetail);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberDetail> getMemberDetail(@PathVariable long memberId) {
        MemberDetail memberDetail = memberService.getMemberDetail(memberId);

        return ResponseEntity.ok(memberDetail);
    }
}
