package com.dareuda.givetree.donation.infrastructure;

import com.dareuda.givetree.donation.domain.DonationMessage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DonationCustomRepository {

    List<DonationMessage> findDonationMessagesByCampaignId(long campaignId, Pageable pageable);
}
