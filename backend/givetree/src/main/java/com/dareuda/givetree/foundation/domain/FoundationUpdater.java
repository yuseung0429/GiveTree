package com.dareuda.givetree.foundation.domain;

import com.dareuda.givetree.foundation.domain.dto.UpdateFoundationCommand;
import com.dareuda.givetree.media.domain.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class FoundationUpdater {
    private final FoundationReader foundationReader;

    @Transactional
    public void update(long foundationId, UpdateFoundationCommand command) {
        Foundation foundation = foundationReader.read(foundationId);

        if (command.getIntroduction() != null) {
            foundation.updateIntroduction(command.getIntroduction());
        }

        if (command.getCorporateRegistrationNumber() != null) {
            foundation.updateCorporateRegistrationNumber(command.getCorporateRegistrationNumber());
        }

        if (command.getImageUrl() != null) {
            // TODO: Image Repository로부터 찾아오기
            //Image image = command.getProfileImageId() != -1 ? MediaReader.read(command.getProfileImageId()) : null;
            Image image = null;
            foundation.updateImage(image);
        }
    }
}
