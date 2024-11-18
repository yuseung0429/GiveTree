package com.dareuda.givetree.sale.infrastructure;

import static com.dareuda.givetree.sale.domain.QSale.sale;

import com.dareuda.givetree.sale.domain.*;
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
    public List<Sale> findBySearch(SalesSearchQuery salesSearchQuery, Pageable pageable) {
        return query.
                select(sale)
                .from(sale)
                .where(sale.isDeleted.eq(false),
                        containsCondition(salesSearchQuery.getQuery()),
                        statusIn(salesSearchQuery.getStatuses()),
                        productionConditionIn(salesSearchQuery.getProductionConditions()),
                        isDirectSaleEq(salesSearchQuery.getIsDirectSale()),
                        isDeliverySaleEq(salesSearchQuery.getIsDeliverySale()))
                .orderBy(sale.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

    private BooleanExpression containsCondition(String query) {
        if (query == null) {
            return null;
        }
        return sale.title.containsIgnoreCase(query)
                .or(sale.description.containsIgnoreCase(query));
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
