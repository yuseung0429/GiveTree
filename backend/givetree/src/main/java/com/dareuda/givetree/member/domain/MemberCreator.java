package com.dareuda.givetree.member.domain;

import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.media.domain.ImageAppender;
import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import com.dareuda.givetree.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberCreator {
    private final MemberRepository memberRepository;
    private final ImageAppender imageAppender;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Member create(CreateMemberCommand command) {
        Image profileImage = command.getProfileImageUrl() != null ? imageAppender.append(command.getProfileImageUrl()) : null;
        String encodedPassword = command.getPassword() == null ?
                null : bCryptPasswordEncoder.encode(command.getPassword());

        Member member = memberRepository.save(
                Member.createMember(
                        command.getEmail(),
                        encodedPassword,
                        command.getName(),
                        profileImage,
                        command.getRole()
                )
        );

        return member;
    }
}
