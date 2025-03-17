package com.project.spring.cleanmeet.domain.servicerequest.repository;

import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceAnswer;
import com.project.spring.cleanmeet.domain.user.entity.Company;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.project.spring.cleanmeet.domain.servicerequest.entity.QServiceAnswer.*;
import static com.project.spring.cleanmeet.domain.user.entity.QCompany.company;


@Repository
@RequiredArgsConstructor
public class ServiceAnswerRepositoryImpl implements ServiceAnswerQueryDsl {
    private final JPAQueryFactory queryFactory;
    @Override
    public Page<ServiceAnswer> findByCompanyPage(Company cp, Pageable pageable) {
        List<ServiceAnswer> contents = queryFactory.selectFrom(serviceAnswer)
                .join(serviceAnswer.company, company)
                .on(serviceAnswer.company.eq(company))
                .orderBy(serviceAnswer.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory.select(serviceAnswer.count())
                .from(serviceAnswer)
                .join(serviceAnswer.company, company)
                .on(serviceAnswer.company.eq(company))
                .fetchOne();

        return PageableExecutionUtils.getPage(contents, pageable, () -> count);
    }
}
