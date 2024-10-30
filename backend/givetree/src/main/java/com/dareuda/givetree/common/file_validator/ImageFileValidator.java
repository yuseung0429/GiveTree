package com.dareuda.givetree.common.file_validator;

import org.springframework.web.multipart.MultipartFile;

public class ImageFileValidator implements FileValidator {

    private static final String REQUIRE_MIME_TYPE = "image";

    @Override
    public void validate(MultipartFile multipartFile) {
        String mimeType = multipartFile.getContentType();
        if (!mimeType.startsWith(REQUIRE_MIME_TYPE)) {
            throw new RuntimeException();
        }
    }
}
