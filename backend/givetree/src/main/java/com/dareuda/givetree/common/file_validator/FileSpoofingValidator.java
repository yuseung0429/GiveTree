package com.dareuda.givetree.common.file_validator;

import org.apache.tika.Tika;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class FileSpoofingValidator implements FileValidator{

    private final static Tika tika = new Tika();

    @Override
    public void validate(MultipartFile multipartFile) {
        try {
            String realMimeType = tika.detect(multipartFile.getBytes());
            if (!multipartFile.getContentType().equals(realMimeType)) {
                throw new RuntimeException();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
