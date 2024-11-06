package com.dareuda.givetree.member.domain;

import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.media.domain.ImageAppender;
import com.dareuda.givetree.member.domain.dto.UpdateMemberCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class MemberUpdater {
    private final MemberReader memberReader;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ImageAppender imageAppender;


    @Transactional
    public void update(long memberId, UpdateMemberCommand command) {
        Member member = memberReader.read(memberId);

        if (command.getPassword() != null) {
            String encodedPassword = bCryptPasswordEncoder.encode(command.getPassword());
            member.updatePassword(encodedPassword);
        }
        if (command.getName() != null) {
            member.updateName(command.getName());
        }
        if (command.getProfileImageUrl() != null) {
            Image profileImage = imageAppender.append(command.getProfileImageUrl());
            member.updateProfileImage(profileImage);
        }
    }
}
