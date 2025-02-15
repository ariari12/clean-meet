package com.project.spring.cleanmeet.domain.servicerequest.repository;

import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ServiceCommissionQueryDsl{
    Page<ServiceCommission> findAllPage(Pageable pageable);
}
