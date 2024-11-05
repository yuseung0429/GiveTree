package com.dareuda.givetree.media.domain;

import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.media.controller.MediaErrorCode;
import org.springframework.stereotype.Component;

@Component
public class MediaValidator {

    public void validateImageExtension(String imageUrl) {
        String extension = imageUrl.substring(imageUrl.lastIndexOf(".") + 1);
        if (extension.equals("jpg") || extension.equals("jpeg") || extension.equals("png")) {
            return;
        }
        throw new RestApiException(MediaErrorCode.UNSUPPORTED_IMAGE_EXTENSION);
    }
}
