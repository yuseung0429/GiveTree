package com.dareuda.givetree.common.file_validator;

import org.apache.tika.Tika;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class FileSpoofingValidator implements FileValidator{

    private final static Tika tika = new Tika();

    @Override
    public void validate(MultipartFile multipartFile) {
        try {
            String detectedMimeType = tika.detect(multipartFile.getBytes());
            String providedMimeType = multipartFile.getContentType();
            if (!detectedMimeType.equals(providedMimeType)) {
                throw new RuntimeException();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
