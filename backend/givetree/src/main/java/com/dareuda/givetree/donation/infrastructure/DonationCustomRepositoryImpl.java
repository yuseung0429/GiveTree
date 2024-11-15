package com.dareuda.givetree.donation.infrastructure;

import static com.dareuda.givetree.donation.domain.QCampaignDonation.campaignDonation;
import static com.dareuda.givetree.member.domain.QMember.member;

import com.dareuda.givetree.donation.domain.DonationMessage;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DonationCustomRepositoryImpl implements DonationCustomRepository {

    private final JPAQueryFactory query;

    public DonationCustomRepositoryImpl(EntityManager em) {
        query = new JPAQueryFactory(em);
    }

    @Override
    public List<DonationMessage> findDonationMessagesByCampaignId(long campaignId, Pageable pageable) {
        return query
                .select(Projections.constructor(DonationMessage.class,
                        member.name,
                        campaignDonation.message))
                .from(campaignDonation)
                .join(member).on(member.eq(campaignDonation.donor))
                .where(campaignDonation.campaign.id.eq(campaignId))
                .orderBy(campaignDonation.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }
}
