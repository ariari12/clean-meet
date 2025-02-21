package com.project.spring.cleanmeet.domain.servicerequest.repository;

import com.project.spring.cleanmeet.domain.servicerequest.entity.CommissionComment;
import com.project.spring.cleanmeet.domain.servicerequest.entity.QCommissionComment;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import java.util.List;


import static com.project.spring.cleanmeet.domain.servicerequest.entity.QCommissionComment.*;
import static com.project.spring.cleanmeet.domain.user.entity.QUser.*;

@RequiredArgsConstructor
public class CommissionCommentRepositoryImpl implements CommissionCommentQueryDsl{
    private final JPAQueryFactory queryFactory;
    @Override
    public List<CommissionComment> findComment(ServiceCommission serviceCommission) {
        QCommissionComment childComment = new QCommissionComment("childComment");


        List<CommissionComment> parentComments = queryFactory
                .selectFrom(commissionComment)
                .leftJoin(commissionComment.childComments, childComment).fetchJoin()
                .join(commissionComment.user, user).fetchJoin()
                .where(
                        commissionComment.serviceCommission.eq(serviceCommission)
                                .and(commissionComment.parentComment.isNull())
                ).fetch();

        return parentComments;
    }
}
