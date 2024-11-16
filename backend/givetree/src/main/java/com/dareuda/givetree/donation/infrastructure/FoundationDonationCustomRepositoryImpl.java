package com.dareuda.givetree.donation.infrastructure;

import com.dareuda.givetree.donation.domain.*;
import com.dareuda.givetree.history.domain.QTransactionLedger;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import java.time.LocalDate;
import java.util.List;

public class FoundationDonationCustomRepositoryImpl implements FoundationDonationCustomRepository {

    private final JPAQueryFactory queryFactory;

    public FoundationDonationCustomRepositoryImpl(EntityManager entityManager) {
        queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public Slice<FoundationDonationUserInfo> findFoundationDonationUserInfo(long userId, long foundationId, boolean own, LocalDate startDate, LocalDate endDate, Pageable pageable) {

        QFoundationDonation fd = QFoundationDonation.foundationDonation;
        QTransactionLedger tl = QTransactionLedger.transactionLedger;

        JPAQuery<FoundationDonationUserInfo> query = queryFactory.query()
                .select(Projections.constructor(
                        FoundationDonationUserInfo.class,
                        fd.donor.id,
                        fd.donor.profileImage.url,
                        fd.donor.name,
                        fd.donationType,
                        fd.amount,
                        tl.ledger.message,
                        fd.createdAt))
                .from(fd)
                .innerJoin(fd.donor)
                .leftJoin(fd.donor.profileImage)
                .leftJoin(tl).on(fd.transaction.eq(tl.transaction))
                .leftJoin(tl.ledger)
                .where(fd.foundation.id.eq(foundationId))
                .orderBy(fd.createdAt.desc());

        if (own) {
            query.where(fd.donor.id.eq(userId));
        }

        if (startDate != null) {
            query.where(fd.createdAt.goe(startDate.atStartOfDay()));
        }

        if (endDate != null) {
            query.where(fd.createdAt.lt(endDate.plusDays(1).atStartOfDay()));
        }

        List<FoundationDonationUserInfo> content = query
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        boolean hasNext = content.size() > pageable.getPageSize();

        if (hasNext) {
            content.remove(content.size() - 1);
        }

        return new SliceImpl<>(content, pageable, hasNext);
    }

    @Override
    public long calculateFoundationDonationAmount(long userId, long foundationId, boolean own){
        QFoundationDonation fd = QFoundationDonation.foundationDonation;
        JPAQuery<Long> query = queryFactory.query()
                .select(fd.amount.sum())
                .from(fd)
                .where(fd.foundation.id.eq(foundationId));
        if (own) {
            query.where(fd.donor.id.eq(userId));
        }

        Long amount = query.fetchOne();
        return amount == null ? 0 : amount;
    }

    @Override
    public FoundationDonationStatisticInfo calculateFoundationDonationStatisticInfo(long foundationId, LocalDate startDate, LocalDate endDate) {
        QFoundationDonation fd = QFoundationDonation.foundationDonation;

        JPAQuery<FoundationDonationStatisticInfo> query = queryFactory.query()
                .select(Projections.constructor(FoundationDonationStatisticInfo.class,
                        new CaseBuilder()
                                .when(fd.donationType.eq(FoundationDonationType.ONE_TIME))
                                .then(1L)
                                .otherwise(0L)
                                .sum()
                                .as("count"),
                        fd.amount.sum(),
                        Expressions.constant(0L)))
                .from(fd)
                .where(fd.foundation.id.eq(foundationId));

        if (startDate != null) {
            query.where(fd.createdAt.goe(startDate.atStartOfDay()));
        }

        if (endDate != null) {
            query.where(fd.createdAt.lt(endDate.plusDays(1).atStartOfDay()));
        }

        return query.fetchOne();
    }
}
