package com.dareuda.givetree.common.config;

import com.dareuda.givetree.common.file_validator.FileSpoofingValidator;
import com.dareuda.givetree.common.file_validator.FileValidator;
import com.dareuda.givetree.common.file_validator.MediaFileValidator;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FileValidatorConfiguration {

    @Bean
    public List<FileValidator> fileValidators() {
        return List.of(
                new FileSpoofingValidator(),
                new MediaFileValidator()
        );
    }
}
