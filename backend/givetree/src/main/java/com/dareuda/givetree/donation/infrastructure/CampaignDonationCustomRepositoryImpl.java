package com.dareuda.givetree.donation.infrastructure;

import com.dareuda.givetree.donation.domain.CampaignDonationUserInfo;
import com.dareuda.givetree.donation.domain.QCampaignDonation;
import com.dareuda.givetree.history.domain.QTransactionLedger;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import java.util.List;

public class CampaignDonationCustomRepositoryImpl implements CampaignDonationCustomRepository {

    private final JPAQueryFactory queryFactory;

    public CampaignDonationCustomRepositoryImpl(EntityManager entityManager) {
        queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public Slice<CampaignDonationUserInfo> findCampaignDonationUserInfo(long userId, long campaignId, boolean own, Pageable pageable) {

        QCampaignDonation cd = QCampaignDonation.campaignDonation;
        QTransactionLedger tl = QTransactionLedger.transactionLedger;

        JPAQuery<CampaignDonationUserInfo> query = queryFactory.query()
                .select(Projections.constructor(
                        CampaignDonationUserInfo.class,
                        cd.donor.id,
                        cd.donor.profileImage.url,
                        cd.donor.name,
                        cd.amount,
                        tl.ledger.message,
                        cd.createdAt))
                .from(cd)
                .innerJoin(cd.donor)
                .leftJoin(cd.donor.profileImage)
                .leftJoin(tl).on(cd.transaction.eq(tl.transaction))
                .leftJoin(tl.ledger)
                .where(cd.campaign.id.eq(campaignId))
                .orderBy(cd.createdAt.desc());

        if (own) {
            query.where(cd.donor.id.eq(userId));
        }

        List<CampaignDonationUserInfo> content = query
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        boolean hasNext = content.size() > pageable.getPageSize();

        if (hasNext) {
            content.remove(content.size() - 1);
        }

        return new SliceImpl<>(content, pageable, hasNext);
    }
}
