package com.dareuda.givetree.donation.infrastructure;

import com.dareuda.givetree.donation.domain.FoundationDonation;
import com.dareuda.givetree.donation.domain.FoundationDonationInfo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;

public interface FoundationDonationRepository extends BaseDonationRepository<FoundationDonation>{

    @Query("""
           SELECT new com.dareuda.givetree.donation.domain.FoundationDonationInfo(
                      f.id,
                      f.member.profileImage.url,
                      f.member.name,
                      fd.donationType,
                      fd.amount,
                      l.message,
                      t.createdAt
                      )
           FROM FoundationDonation fd
           JOIN fd.foundation f
           JOIN f.member m
           LEFT JOIN m.profileImage p
           LEFT JOIN TransactionLedger tl ON fd.transaction = tl.transaction
           LEFT JOIN tl.transaction t
           LEFT JOIN tl.ledger l
           WHERE fd.donor.id = :memberId
           """)
    Slice<FoundationDonationInfo> findFoundationDonationInfoByMemberId(long memberId, Pageable pageable);
}
