package com.dareuda.givetree.donation.infrastructure;

import static com.dareuda.givetree.donation.domain.QCampaignDonation.campaignDonation;
import static com.dareuda.givetree.member.domain.QMember.member;

import com.dareuda.givetree.donation.domain.DonationMessage;
import com.querydsl.core.types.Projections;
import com.dareuda.givetree.donation.domain.QDonation;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public class DonationCustomRepositoryImpl implements DonationCustomRepository {

    private final JPAQueryFactory queryFactory;

    public DonationCustomRepositoryImpl(EntityManager entityManager) {
        queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public long calculateDonationAmountByMemberIdForPeriod(long memberId, LocalDate startDate, LocalDate endDate) {
        QDonation donation = QDonation.donation;

        JPAQuery<Long> query = queryFactory
                .query()
                .select(donation.amount.sum())
                .from(donation)
                .where(donation.donor.id.eq(memberId));

        if (startDate != null) {
            query.where(donation.createdAt.goe(startDate.atStartOfDay()));
        }

        if (endDate != null) {
            query.where(donation.createdAt.lt(endDate.atStartOfDay().plusDays(1L)));
        }

        Long totalAmount = query.fetchOne();

        return totalAmount != null ? totalAmount : 0;
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
