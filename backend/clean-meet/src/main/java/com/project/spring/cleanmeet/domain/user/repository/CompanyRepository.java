package com.project.spring.cleanmeet.domain.user.repository;

import com.project.spring.cleanmeet.domain.user.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
