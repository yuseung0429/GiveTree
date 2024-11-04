package com.dareuda.givetree.foundation.infrastructure;

import com.dareuda.givetree.foundation.domain.Foundation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface FoundationRepository extends Repository<Foundation, Long> {
    Foundation save(Foundation foundation);

    @Query("SELECT f FROM Foundation f WHERE f.id = :id and f.isDeleted = false")
    Optional<Foundation> findById(long id);

    @Query("SELECT f FROM Foundation f WHERE f.owner.id = :ownerId and f.isDeleted = false")
    Optional<Foundation> findByOwnerId(long ownerId);
}
