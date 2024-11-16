package com.dareuda.givetree.donation.infrastructure;

import com.dareuda.givetree.campaign.domain.Campaign;
import com.dareuda.givetree.donation.domain.CampaignDonation;
import com.dareuda.givetree.donation.domain.CampaignDonationFoundationInfo;
import com.dareuda.givetree.donation.domain.CampaignDonationStatisticInfo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;

public interface CampaignDonationRepository extends BaseDonationRepository<CampaignDonation>, CampaignDonationCustomRepository {
    @Query("""
           SELECT new com.dareuda.givetree.donation.domain.CampaignDonationFoundationInfo(
                      f.id,
                      f.member.profileImage.url,
                      f.member.name,
                      c.id,
                      c.name,
                      cd.amount,
                      l.message,
                      cd.createdAt
                      )
           FROM CampaignDonation cd
           JOIN cd.campaign c
           JOIN c.foundation f
           JOIN f.member
           LEFT JOIN c.foundation.member.profileImage
           LEFT JOIN TransactionLedger tl ON cd.transaction = tl.transaction
           LEFT JOIN tl.ledger l
           WHERE cd.donor.id = :userId
           ORDER BY cd.createdAt DESC
           """)
    Slice<CampaignDonationFoundationInfo> findCampaignDonationFoundationInfoByUserId(long userId, Pageable pageable);

    @Query("""
           SELECT new com.dareuda.givetree.donation.domain.CampaignDonationStatisticInfo(
                      COUNT(cd),
                      SUM(cd.amount),
                      cd.campaign.targetFundraisingAmount
                      )
           FROM CampaignDonation cd
           JOIN cd.campaign c
           WHERE cd.campaign.id = :campaignId
           """)
    CampaignDonationStatisticInfo calculateCampaignDonationStatisticInfo(long campaignId);

    long countByCampaign(Campaign campaign);
}