package com.dareuda.givetree.foundation.infrastructure;

import com.dareuda.givetree.foundation.domain.Foundation;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface FoundationRepository extends Repository<Foundation, Long> {
    Foundation save(Foundation foundation);
    Optional<Foundation> findById(long id);
    Optional<Foundation> findByMemberId(long id);
}
