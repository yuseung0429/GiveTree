package com.dareuda.givetree.media.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Component
public class MediaStorage {

    public void store(String memberName, MultipartFile multipartFile) {

    }
}
