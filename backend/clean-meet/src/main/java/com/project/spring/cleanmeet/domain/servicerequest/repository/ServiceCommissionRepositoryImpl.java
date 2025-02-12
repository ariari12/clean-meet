package com.project.spring.cleanmeet.domain.servicerequest.repository;


import com.project.spring.cleanmeet.common.util.QueryDslUtil;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static com.project.spring.cleanmeet.domain.servicecategory.entity.QServiceCategory.*;
import static com.project.spring.cleanmeet.domain.servicerequest.entity.QServiceCommission.*;


@RequiredArgsConstructor
public class ServiceCommissionRepositoryImpl implements ServiceCommissionQueryDsl{

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<ServiceCommission> findAllPage(Pageable pageable) {


        PathBuilder<?> pathBuilder = new PathBuilder<>(serviceCommission.getType(), serviceCommission.getMetadata());
        // `Pageable`에서 정렬 정보 가져오기
        OrderSpecifier<?> orderSpecifier = QueryDslUtil.getOrderSpecifier(pageable, pathBuilder);

        List<ServiceCommission> contents = queryFactory
                .selectFrom(serviceCommission)
                .leftJoin(serviceCommission.serviceCategory, serviceCategory).fetchJoin()
                .orderBy(orderSpecifier)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();


        Long total = queryFactory
                .select(serviceCommission.count())
                .from(serviceCommission)
                .fetchOne();


        return PageableExecutionUtils.getPage(contents, pageable, () -> total);
    }
}
