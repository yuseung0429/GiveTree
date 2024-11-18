package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.category.domain.Category;
import com.dareuda.givetree.category.domain.CategoryManager;
import com.dareuda.givetree.foundation.domain.dto.CreateFoundationCommand;
import com.dareuda.givetree.foundation.infrastructure.FoundationRepository;
import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.media.domain.ImageAppender;
import com.dareuda.givetree.member.domain.Member;
import com.dareuda.givetree.member.domain.MemberCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FoundationCreator {
    private final FoundationRepository foundationRepository;
    private final ImageAppender imageAppender;
    private final MemberCreator memberCreator;
    private final CategoryManager categoryManager;

    @Transactional
    public Foundation create(CreateFoundationCommand command) {
        Member member = memberCreator.create(command.getCreateMemberCommand());

        Image titleImage = command.getTitleImageUrl() != null ? imageAppender.append(command.getTitleImageUrl()) : null;
        List<Image> images = command.getImageUrls().stream().map(imageAppender::append).toList();
        List<Category> categories = command.getCategories().stream().map(categoryManager::getCategory).toList();

        return foundationRepository.save(
                Foundation.createFoundation(
                        member,
                        command.getIntroduction(),
                        command.getCorporateRegistrationNumber(),
                        command.getPhoneNumber(),
                        command.getAddress(),
                        titleImage,
                        images,
                        categories
                )
        );
    }
}