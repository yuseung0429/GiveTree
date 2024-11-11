package com.dareuda.givetree.campaign.infrastructure;

import com.dareuda.givetree.campaign.domain.Campaign;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface CampaignRepository extends Repository<Campaign, Long> {
    Campaign save(Campaign campaign);

    @Query("""
        SELECT DISTINCT c
        FROM Campaign c
        left join fetch c.titleImage
        left join fetch c.images
        WHERE c.id = :id and c.isDeleted = false
    """)
    Optional<Campaign> findById(long id);

    List<Long> findByFoundationId(long foundationId);

    int countByFoundationId(long foundationId);
}
