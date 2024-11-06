package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.foundation.domain.dto.CreateFoundationCommand;
import com.dareuda.givetree.foundation.infrastructure.FoundationRepository;
import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class FoundationCreator {
    private final FoundationRepository foundationRepository;
    private final MemberReader memberReader;

    @Transactional
    public long create(long memberId, CreateFoundationCommand command) {
        Member owner = memberReader.read(memberId);
        // TODO: 이미지 읽기 추가되면 변경
        //Image image = command.getProfileImageId() != null ? imageReader.read(command.getProfileImageId()) : null;
        Image image = null;

        Foundation foundation = foundationRepository.save(
                Foundation.createFoundation(
                        owner,
                        command.getIntroduction(),
                        command.getCorporateRegistrationNumber(),
                        image
                )
        );

        return foundation.getId();
    }
}