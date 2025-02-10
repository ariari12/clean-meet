package com.project.spring.cleanmeet.domain.user.repository;

import com.project.spring.cleanmeet.domain.user.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByUserId(Long id);
}
