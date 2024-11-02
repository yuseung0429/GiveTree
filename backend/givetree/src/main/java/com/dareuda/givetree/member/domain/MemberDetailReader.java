package com.dareuda.givetree.member.domain;

import com.dareuda.givetree.member.domain.dto.MemberDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class MemberDetailReader {
    private final MemberReader memberReader;

    @Transactional(readOnly = true)
    public MemberDetail read(long memberId) {
        Member member = memberReader.read(memberId);

        return MemberDetail.builder()
                .email(member.getEmail())
                .name(member.getName())
                .phoneNumber(member.getPhoneNumber())
                .address(member.getAddress())
                .build();
    }
}
