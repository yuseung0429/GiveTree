package com.dareuda.givetree.media.domain;

import com.dareuda.givetree.media.infrastructure.MediaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Component
public class ImageAppender {

    private final MediaValidator mediaValidator;
    private final MediaRepository mediaRepository;

    @Transactional
    public Image append(String imageUrl) {
        mediaValidator.validateImageExtension(imageUrl);
        return (Image) mediaRepository.save(Image.builder()
                .id(UUID.randomUUID())
                .url(imageUrl)
                .build());
    }
}
