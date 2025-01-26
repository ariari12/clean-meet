package com.project.spring.cleanmeet.domain.User.repository;

import com.project.spring.cleanmeet.domain.User.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
