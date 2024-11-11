package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.foundation.domain.dto.UpdateFoundationCommand;
import com.dareuda.givetree.media.domain.Image;
import com.dareuda.givetree.media.domain.ImageAppender;
import com.dareuda.givetree.member.domain.MemberUpdater;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class FoundationUpdater {
    private final FoundationReader foundationReader;
    private final ImageAppender imageAppender;
    private final MemberUpdater memberUpdater;

    @Transactional
    public void update(long foundationId, UpdateFoundationCommand command) {
        Foundation foundation = foundationReader.read(foundationId);

        memberUpdater.update(foundationId, command.getUpdateMemberCommand());

        if (command.getIntroduction() != null) {
            foundation.updateIntroduction(command.getIntroduction());
        }
        if (command.getCorporateRegistrationNumber() != null) {
            foundation.updateCorporateRegistrationNumber(command.getCorporateRegistrationNumber());
        }
        if (command.getPhoneNumber() != null) {
            foundation.updatePhoneNumber(command.getPhoneNumber());
        }
        if (command.getAddress() != null) {
            foundation.updateAddress(command.getAddress());
        }
        if (command.getTitleImageUrl() != null) {
            Image image = imageAppender.append(command.getTitleImageUrl());
            foundation.updateTitleImage(image);
        }
        if (command.getNewImageUrls() != null) {
            command.getNewImageUrls().forEach(newImageUrl ->
                    foundation.addImage(imageAppender.append(newImageUrl))
            );
        }
        if (command.getDeleteImageOrders() != null) {
            foundation.deleteImages(command.getDeleteImageOrders());
        }
    }
}
