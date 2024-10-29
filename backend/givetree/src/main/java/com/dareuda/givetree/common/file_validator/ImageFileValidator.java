package com.dareuda.givetree.common.file_validator;

import org.apache.tika.Tika;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class ImageFileValidator implements FileValidator {

    private static final String REQUIRE_MIME_TYPE = "image";
    private static final Tika tika = new Tika();

    @Override
    public void validate(MultipartFile multipartFile) {
        try {
            String mimeType = tika.detect(multipartFile.getInputStream());
            if (!mimeType.startsWith(REQUIRE_MIME_TYPE)) {
                throw new RuntimeException();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
