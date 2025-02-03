package com.project.spring.cleanmeet.domain.User.repository;

import com.project.spring.cleanmeet.domain.User.dto.ServiceCategoryRequestDto;
import com.project.spring.cleanmeet.domain.User.entity.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ServiceCategoryRepository extends JpaRepository<ServiceCategory, Long> {
    Optional<ServiceCategory> findByName(String name);
}
