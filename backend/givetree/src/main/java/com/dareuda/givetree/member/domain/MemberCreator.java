package com.dareuda.givetree.member.domain;

import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.member.domain.dto.CreateMemberCommand;
import com.dareuda.givetree.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberCreator {
    private final MemberRepository memberRepository;

    public long create(CreateMemberCommand command) {
        // TODO: 이미지 읽기 추가되면 변경
        //Image image = command.getProfileImageId() != null ? imageReader.read(command.getProfileImageId()) : null;
        Image image = null;

        Member member = memberRepository.save(
                Member.createMember(
                        command.getEmail(),
                        command.getPassword(),
                        command.getName(),
                        image,
                        command.getRole()
                )
        );

        return member.getId();
    }
}
