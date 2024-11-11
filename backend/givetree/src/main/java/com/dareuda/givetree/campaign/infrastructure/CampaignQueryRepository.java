package com.dareuda.givetree.campaign.infrastructure;

import com.dareuda.givetree.campaign.domain.Campaign;
import com.dareuda.givetree.campaign.domain.dto.CampaignSearchFilter;
import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.dareuda.givetree.campaign.domain.QCampaign.campaign;

@Repository
public class CampaignQueryRepository {
    private final JPAQueryFactory query;

    public CampaignQueryRepository(EntityManager em) {
        query = new JPAQueryFactory(em);
    }

    public Page<Campaign> getCampaignPage(
            CampaignSearchFilter filter,
            Pageable pageable
    ) {
        BooleanExpression searchBooleanExpression = Expressions.TRUE
                .and(likeName(filter.getName()))
                .and(likeIntroduction(filter.getIntroduction()))
                .and(likeFoundationName(filter.getFoundationName()))
                .and(campaign.isDeleted.isFalse());

        List<Campaign> foundations = query
                .select(campaign)
                .from(campaign)
                .where(searchBooleanExpression)
                .orderBy(campaign.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long resultCount = query
                .select(campaign.count())
                .from(campaign)
                .where(searchBooleanExpression)
                .fetchFirst();

        if (resultCount == null) {
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR, "캠페인 조회 중에 서버에 문제가 발생했습니다.");
        }

        return PageableExecutionUtils.getPage(foundations, pageable, () -> resultCount);
    }

    public BooleanExpression likeName(String name) {
        if (name != null) {
            return campaign.name.like("%" + name + "%");
        }
        return null;
    }

    public BooleanExpression likeIntroduction(String introduction) {
        if (introduction != null) {
            return campaign.introduction.like("%" + introduction + "%");
        }
        return null;
    }

    public BooleanExpression likeFoundationName(String foundationName) {
        if (foundationName != null) {
            return campaign.foundation.member.name.like("%" + foundationName + "%");
        }
        return null;
    }
}
