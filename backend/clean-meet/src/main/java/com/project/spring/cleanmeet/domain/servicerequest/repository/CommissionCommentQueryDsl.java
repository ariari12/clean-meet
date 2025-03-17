package com.project.spring.cleanmeet.domain.servicerequest.repository;

import com.project.spring.cleanmeet.domain.servicerequest.entity.CommissionComment;
import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;


public interface CommissionCommentQueryDsl {
    List<CommissionComment> findComment(ServiceCommission serviceCommission);

    Page<CommissionComment> findMyBoards(Pageable pageable, Long userId);
}
