package com.project.spring.cleanmeet.domain.servicerequest.repository;

import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceAnswer;
import com.project.spring.cleanmeet.domain.user.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ServiceAnswerRepository extends JpaRepository<ServiceAnswer, Long>, ServiceAnswerQueryDsl {

    List<ServiceAnswer> findByCompany(Company company);
    List<ServiceAnswer> findByCompanyAndIsRead(Company company, boolean isRead);

}
