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

        String profileImageUrl = member.getProfileImage() != null ? member.getProfileImage().getUrl() : null;

        return MemberDetail.builder()
                .id(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .profileImageUrl(profileImageUrl)
                .role(member.getRole().toString())
                .build();
    }
}
