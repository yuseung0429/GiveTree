package com.dareuda.givetree.common.file_validator;

import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.media.controller.MediaErrorCode;
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
                throw new RestApiException(MediaErrorCode.FILE_SPOOFING_DETECTED);
            }
        } catch (IOException e) {
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
