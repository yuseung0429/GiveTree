package com.dareuda.givetree.member.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.media.domain.ImageAppender;
import com.dareuda.givetree.member.controller.MemberErrorCode;
import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import com.dareuda.givetree.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class MemberCreator {
    private final MemberRepository memberRepository;
    private final ImageAppender imageAppender;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public Member create(CreateMemberCommand command) {
        if (memberRepository.existsByEmail(command.getEmail())) {
            throw new RestApiException(MemberErrorCode.EMAIL_ALREADY_EXISTS);
        }

        Image profileImage = command.getProfileImageUrl() != null ? imageAppender.append(command.getProfileImageUrl()) : null;
        String encodedPassword = command.getPassword() == null ?
                null : bCryptPasswordEncoder.encode(command.getPassword());

        return memberRepository.save(
                Member.createMember(
                        command.getEmail(),
                        encodedPassword,
                        command.getName(),
                        profileImage,
                        command.getRole()
                )
        );
    }
}
