package com.project.spring.cleanmeet.domain.servicerequest.repository;

import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceCommission;
import com.project.spring.cleanmeet.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceCommissionRepository extends JpaRepository<ServiceCommission, Long>, ServiceCommissionQueryDsl {

    Long user(User user);


}
