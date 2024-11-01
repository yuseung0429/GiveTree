package com.dareuda.givetree.campaign.infrastructure;

import com.dareuda.givetree.campaign.domain.Campaign;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface CampaignRepository extends Repository<Campaign, Long> {
    Campaign save(Campaign campaign);
    Optional<Campaign> findById(long id);
}
