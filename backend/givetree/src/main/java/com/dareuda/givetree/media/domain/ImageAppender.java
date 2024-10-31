package com.dareuda.givetree.media.domain;

import com.dareuda.givetree.media.infrastructure.MediaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@RequiredArgsConstructor
@Component
public class ImageAppender {

    private final MediaValidator mediaValidator;
    private final MediaRepository mediaRepository;

    public void append(String imageUrl) {
        mediaValidator.validateImageExtension(imageUrl);
        mediaRepository.save(Image.builder()
                .id(UUID.randomUUID())
                .url(imageUrl)
                .build());
    }
}
