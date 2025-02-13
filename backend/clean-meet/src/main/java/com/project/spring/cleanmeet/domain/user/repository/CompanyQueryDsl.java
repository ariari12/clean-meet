package com.project.spring.cleanmeet.domain.user.repository;

import com.project.spring.cleanmeet.domain.user.entity.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface CompanyQueryDsl {
    Page<Company> findCompanyCardPage(Pageable pageable);
}
