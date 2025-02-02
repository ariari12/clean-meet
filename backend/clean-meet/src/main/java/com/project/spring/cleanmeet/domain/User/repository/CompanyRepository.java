package com.project.spring.cleanmeet.domain.User.repository;

import com.project.spring.cleanmeet.domain.User.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
