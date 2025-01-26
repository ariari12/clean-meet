package com.project.spring.cleanmeet.domain.User.repository;

import com.project.spring.cleanmeet.domain.User.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
