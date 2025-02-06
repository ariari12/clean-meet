package com.project.spring.cleanmeet.domain.servicerequest.repository;

import com.project.spring.cleanmeet.domain.servicerequest.entity.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {

}
