package com.project.spring.cleanmeet.domain.image.repository;

import com.project.spring.cleanmeet.domain.image.entity.Image;
import com.project.spring.cleanmeet.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {

    // 유저 외래키를 가지고있는 데이터는 하나뿐이다.
    Optional<Image> findByUser(User user);
}
