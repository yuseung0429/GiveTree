package com.dareuda.givetree.member.domain;

import com.dareuda.givetree.media.domain.Image;
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
        if (command.getPhoneNumber() != null) {
            member.updatePhoneNumber(command.getPhoneNumber());
        }
        if (command.getAddress() != null) {
            member.updateAddress(command.getAddress());
        }
        if (command.getProfileImageUrl() != null) {
            // TODO: Image Repository로부터 찾아오기
            //Image image = command.getProfileImageId() != -1 ? MediaReader.read(command.getProfileImageId()) : null;
            Image image = null;
            member.updateProfileImage(image);
        }
    }
}
