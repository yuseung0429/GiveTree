package com.dareuda.givetree.media.domain;

import com.dareuda.givetree.media.infrastructure.S3Storage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Component
public class MediaStorage {

    private final FileNameGenerator fileNameGenerator;
    private final S3Storage s3Storage;

    public String store(String memberName, MultipartFile multipartFile) {
        return s3Storage.upload(
                multipartFile,
                fileNameGenerator.generate(multipartFile, memberName)
        );
    }
}
