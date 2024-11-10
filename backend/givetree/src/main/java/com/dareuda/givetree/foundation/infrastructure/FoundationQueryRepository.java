package com.dareuda.givetree.foundation.infrastructure;

import com.dareuda.givetree.common.errors.errorcode.CommonErrorCode;
import com.dareuda.givetree.common.errors.exception.RestApiException;
import com.dareuda.givetree.foundation.domain.Foundation;
import com.dareuda.givetree.foundation.domain.dto.FoundationSearchFilter;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.dareuda.givetree.foundation.domain.QFoundation.foundation;

@Repository
public class FoundationQueryRepository {
    private final JPAQueryFactory query;

    public FoundationQueryRepository(EntityManager em) {
        query = new JPAQueryFactory(em);
    }

    public Page<Foundation> getFoundationPage(
            FoundationSearchFilter filter,
            Pageable pageable
    ) {
        BooleanExpression searchBooleanExpression = Expressions.TRUE
                .and(likeName(filter.getName()))
                .and(eqCategory(filter.getCategory()))
                .and(foundation.member.isDeleted.isFalse());

        List<Foundation> foundations = query
                .select(foundation)
                .from(foundation)
                .where(searchBooleanExpression)
                .orderBy(foundation.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long resultCount = query
                .select(foundation.count())
                .from(foundation)
                .where(searchBooleanExpression)
                .fetchFirst();

        if (resultCount == null) {
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR, "재단 조회 중에 서버에 문제가 발생했습니다.");
        }

        return PageableExecutionUtils.getPage(foundations, pageable, () -> resultCount);
    }

    public BooleanExpression likeName(String name) {
        if (name != null) {
            return foundation.member.name.like("%" + name + "%");
        }
        return null;
    }

    public BooleanExpression eqCategory(String category) {
        if (category != null) {
            return foundation.categories.any().category.name.eq(category);
        }
        return null;
    }
}
