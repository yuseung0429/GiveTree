package com.dareuda.givetree.donation.infrastructure;

import com.dareuda.givetree.donation.domain.CampaignDonation;
import com.dareuda.givetree.donation.domain.CampaignDonationInfo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;

public interface CampaignDonationRepository extends BaseDonationRepository<CampaignDonation> {
    @Query("""
           SELECT new com.dareuda.givetree.donation.domain.CampaignDonationInfo(
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
           WHERE cd.donor.id = :memberId
           ORDER BY cd.createdAt DESC
           """)
    Slice<CampaignDonationInfo> findCampaignDonationInfoByMemberId(long memberId, Pageable pageable);

}