package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.foundation.domain.dto.CreateFoundationCommand;
import com.dareuda.givetree.foundation.infrastructure.FoundationRepository;
import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.media.domain.ImageAppender;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FoundationCreator {
    private final FoundationRepository foundationRepository;
    private final MemberReader memberReader;
    private final ImageAppender imageAppender;

    @Transactional
    public long create(long memberId, CreateFoundationCommand command) {
        Member owner = memberReader.read(memberId);
        foundationRepository.findByOwnerId(owner.getId())
                .ifPresent(foundation -> {
                    String errorMessage = "해당 재단회원에게는 이미 [ID=" + foundation.getId() + "]인 재단이 존재합니다.";
                    throw new RestApiException(CommonErrorCode.BAD_REQUEST, errorMessage);
                });

        Image titleImage = null;
        List<Image> images = new ArrayList<>();

        if (command.getTitleImageUrl() != null) {
            titleImage = imageAppender.append(command.getTitleImageUrl());
        }
        if (command.getImageUrls() != null) {
            command.getImageUrls().forEach(image -> images.add(imageAppender.append(image)));
        }

        Foundation foundation = foundationRepository.save(
                Foundation.createFoundation(
                        owner,
                        command.getIntroduction(),
                        command.getCorporateRegistrationNumber(),
                        command.getPhoneNumber(),
                        command.getAddress(),
                        titleImage,
                        images
                )
        );
        return foundation.getId();
    }
}