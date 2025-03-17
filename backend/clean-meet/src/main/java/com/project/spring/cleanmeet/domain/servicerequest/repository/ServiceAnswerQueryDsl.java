package com.project.spring.cleanmeet.domain.servicerequest.repository;

import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceAnswer;
import com.project.spring.cleanmeet.domain.user.entity.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ServiceAnswerQueryDsl {
    Page<ServiceAnswer> findByCompanyPage(Company company, Pageable pageable);
}
