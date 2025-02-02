package com.project.spring.cleanmeet.domain.User.repository;

import com.project.spring.cleanmeet.domain.User.entity.ServiceCompanyCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceCompanyCategoryRepository extends JpaRepository<ServiceCompanyCategory, Long> {
}
