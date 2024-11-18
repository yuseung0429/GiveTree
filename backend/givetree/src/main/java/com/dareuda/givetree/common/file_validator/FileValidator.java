package com.dareuda.givetree.common.file_validator;

import org.springframework.web.multipart.MultipartFile;

public interface FileValidator {

    void validate(MultipartFile multipartFile);
}
