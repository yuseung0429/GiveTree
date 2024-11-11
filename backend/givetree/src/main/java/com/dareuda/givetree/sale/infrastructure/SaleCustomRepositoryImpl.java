package com.dareuda.givetree.sale.infrastructure;

import static com.dareuda.givetree.sale.domain.QSale.sale;

import com.dareuda.givetree.sale.domain.ProductionCondition;
import com.dareuda.givetree.sale.domain.SaleDetail;
import com.dareuda.givetree.sale.domain.SaleStatus;
import com.dareuda.givetree.sale.domain.SalesSearchQuery;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SaleCustomRepositoryImpl implements SaleCustomRepository{

    private final JPAQueryFactory query;

    public SaleCustomRepositoryImpl(EntityManager em) {
        query = new JPAQueryFactory(em);
    }

    @Override
    public List<SaleDetail> findBySearch(SalesSearchQuery salesSearchQuery, Pageable pageable) {
        return query.
                select(Projections.constructor(SaleDetail.class,
                        sale.id,
                        sale.price,
                        sale.title,
                        sale.images.get(0).image.url,
                        sale.status,
                        sale.productionCondition,
                        sale.isDirectSale,
                        sale.isDeliverySale))
                .from(sale)
                .where(sale.title.containsIgnoreCase(salesSearchQuery.getQuery())
                        .or(sale.title.containsIgnoreCase(salesSearchQuery.getQuery())),
                        statusIn(salesSearchQuery.getStatuses()),
                        productionConditionIn(salesSearchQuery.getProductionConditions()),
                        isDirectSaleEq(salesSearchQuery.isDirectSale()),
                        isDeliverySaleEq(salesSearchQuery.isDeliverySale()),
                        sale.isDeleted.eq(false))
                .orderBy(sale.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

    private BooleanExpression statusIn(List<SaleStatus> statuses) {
        return (statuses == null || statuses.isEmpty()) ? null : sale.status.in(statuses);
    }

    private BooleanExpression productionConditionIn(List<ProductionCondition> productionConditions) {
        return (productionConditions == null || productionConditions.isEmpty()) ? null : sale.productionCondition.in(productionConditions);
    }

    private BooleanExpression isDirectSaleEq(Boolean isDirectSale) {
        return isDirectSale == null ? null : sale.isDirectSale.eq(isDirectSale);
    }

    private BooleanExpression isDeliverySaleEq(Boolean isDeliverySale) {
        return isDeliverySale == null ? null : sale.isDeliverySale.eq(isDeliverySale);
    }
}
