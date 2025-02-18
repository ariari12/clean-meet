package com.project.spring.cleanmeet.domain.user.repository;

import com.project.spring.cleanmeet.domain.user.entity.Address;
import com.project.spring.cleanmeet.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<Address> findByUser(User user);
}
