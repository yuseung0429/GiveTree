package com.dareuda.givetree.media.service;

import com.dareuda.givetree.media.domain.MediaStorage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class StorageService {

    private final MediaStorage mediaStorage;

    public String store(String memberName, MultipartFile multipartFile) {
        return mediaStorage.store(memberName, multipartFile);
    }
}
