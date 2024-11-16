package com.dareuda.givetree.donation.infrastructure;

import com.dareuda.givetree.donation.domain.Donation;
import com.dareuda.givetree.donation.domain.DonationStatisticInfo;
import org.springframework.data.jpa.repository.Query;

public interface DonationRepository extends BaseDonationRepository<Donation>, DonationCustomRepository {

    @Query("""
           SELECT new com.dareuda.givetree.donation.domain.DonationStatisticInfo(
                   SUM(d.amount),
                   COUNT(d),
                   SUM(CASE WHEN fd.donationType = com.dareuda.givetree.donation.domain.FoundationDonationType.ONE_TIME THEN fd.amount ELSE 0 END),
                   COUNT(CASE WHEN fd.donationType = com.dareuda.givetree.donation.domain.FoundationDonationType.ONE_TIME THEN 1 ELSE NULL END),
                   SUM(CASE WHEN fd.donationType = com.dareuda.givetree.donation.domain.FoundationDonationType.REGULAR THEN fd.amount ELSE 0 END),
                   COUNT(CASE WHEN fd.donationType = com.dareuda.givetree.donation.domain.FoundationDonationType.REGULAR THEN 1 ELSE NULL END),
                   SUM(cd.amount),
                   COUNT(cd),
                   NULL
                   )
           FROM Donation d
           LEFT JOIN FoundationDonation fd on d.id = fd.id
           LEFT JOIN CampaignDonation cd on d.id = cd.id
           WHERE d.donor.id = :memberId
           """)
    DonationStatisticInfo calculateDonationStatisticByMemberId(long memberId);
}
