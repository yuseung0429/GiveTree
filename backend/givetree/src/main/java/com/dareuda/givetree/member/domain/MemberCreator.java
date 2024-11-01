package com.dareuda.givetree.member.domain;

import com.dareuda.givetree.member.controller.dto.request.CreateMemberRequest;
import com.dareuda.givetree.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberCreator {
    private final MemberRepository memberRepository;

    public long append(CreateMemberRequest request) {
        Member member = Member.builder()
                .email(request.getEmail())
                .name(request.getName())
                .address(request.getAddress())
                .phoneNumber(request.getPhoneNumber())
                .build();
        member = memberRepository.save(member);

        return member.getId();
    }
}
