package com.dareuda.givetree.donation.infrastructure;

import com.dareuda.givetree.donation.domain.QDonation;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.time.LocalDate;

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
    }
}
