package com.dareuda.givetree.media.infrastructure;

import com.dareuda.givetree.media.domain.Media;
import org.springframework.data.repository.Repository;

public interface MediaRepository extends Repository<Media, Long> {

    Media save(Media media);
}
