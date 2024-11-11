package com.dareuda.givetree.foundation.infrastructure;

import com.dareuda.givetree.foundation.domain.Foundation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface FoundationRepository extends Repository<Foundation, Long> {
    Foundation save(Foundation foundation);

    @Query("""
        SELECT DISTINCT f
        FROM Foundation f
        join fetch f.member m
        left join fetch f.titleImage
        left join fetch f.images
        WHERE f.id = :id and m.isDeleted = false
    """)
    Optional<Foundation> findById(long id);
}
