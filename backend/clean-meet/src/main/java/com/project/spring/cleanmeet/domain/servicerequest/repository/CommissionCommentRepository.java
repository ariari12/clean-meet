package com.project.spring.cleanmeet.domain.servicerequest.repository;

import com.project.spring.cleanmeet.domain.servicerequest.entity.CommissionComment;
import org.springframework.data.jpa.repository.JpaRepository;



public interface CommissionCommentRepository extends JpaRepository<CommissionComment, Long>, CommissionCommentQueryDsl{


}
