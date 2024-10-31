package com.dareuda.givetree.common.file_validator;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class MediaFileValidator implements FileValidator {

    private static final List<String> ALLOWED_MIME_TYPES = List.of("image", "video");

    @Override
    public void validate(MultipartFile multipartFile) {
        String mimeType = multipartFile.getContentType();
        if (mimeType == null || ALLOWED_MIME_TYPES.stream().noneMatch(mimeType::startsWith)) {
            throw new RuntimeException();
        }
    }
}
