package com.project.spring.cleanmeet.domain.user.repository;

import com.project.spring.cleanmeet.domain.user.entity.ServiceCompanyCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceCompanyCategoryRepository extends JpaRepository<ServiceCompanyCategory, Long> {
}
