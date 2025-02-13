package com.project.spring.cleanmeet.domain.user.repository;

import com.project.spring.cleanmeet.domain.user.entity.Company;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import java.util.List;


import static com.project.spring.cleanmeet.domain.user.entity.QCompany.company;

@RequiredArgsConstructor
public class CompanyRepositoryImpl implements CompanyQueryDsl {
    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Company> findCompanyCardPage(Pageable pageable) {
        List<Company> content = queryFactory
                .selectFrom(company)
                .fetch();

        Long total = queryFactory
                .select(company.count())
                .from(company)
                .fetchOne();
        return PageableExecutionUtils.getPage(content, pageable, () -> total);
    }
}
