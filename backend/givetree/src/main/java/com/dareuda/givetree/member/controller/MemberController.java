package com.dareuda.givetree.member.controller;

import com.dareuda.givetree.member.controller.dto.request.CreateMemberRequest;
import com.dareuda.givetree.member.domain.MemberDetail;
import com.dareuda.givetree.member.service.MemberService;
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
    public ResponseEntity<Void> createMember(CreateMemberRequest request) {
        long memberId = memberService.createMember(request);

        return ResponseEntity.created(
                        UriComponentsBuilder
                                .fromPath("/members/{memberId}")
                                .buildAndExpand(memberId)
                                .toUri()
                )
                .build();
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberDetail> getMemberDetail(@PathVariable long memberId) {
        MemberDetail memberDetail = memberService.getMemberDetail(memberId);

        return ResponseEntity.ok(memberDetail);
    }
}
