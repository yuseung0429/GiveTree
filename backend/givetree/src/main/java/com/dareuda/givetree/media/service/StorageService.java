package com.dareuda.givetree.media.service;

import com.dareuda.givetree.media.domain.MediaStorage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class StorageService {

    private final MediaStorage mediaStorage;

    public void store(String memberName, MultipartFile multipartFile) {
        mediaStorage.store(memberName, multipartFile);
    }
}
