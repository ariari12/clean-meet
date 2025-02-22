package com.project.spring.cleanmeet.domain.servicerequest.repository;

import com.project.spring.cleanmeet.domain.servicerequest.entity.CommissionComment;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;


import java.util.List;


public interface CommissionCommentQueryDsl {
    List<CommissionComment> findComment(ServiceCommission serviceCommission);
}
