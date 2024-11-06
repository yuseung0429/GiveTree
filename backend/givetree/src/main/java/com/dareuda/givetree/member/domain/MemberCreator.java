package com.dareuda.givetree.member.domain;

import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.media.domain.ImageAppender;
import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import com.dareuda.givetree.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberCreator {
    private final MemberRepository memberRepository;
    private final ImageAppender imageAppender;

    public Member create(CreateMemberCommand command) {
        Image profileImage = command.getProfileImageUrl() != null ? imageAppender.append(command.getProfileImageUrl()) : null;

        Member member = memberRepository.save(
                Member.createMember(
                        command.getEmail(),
                        command.getPassword(),
                        command.getName(),
                        profileImage
                )
        );

        return member;
    }
}
