package com.project.spring.cleanmeet.domain.image.service;

import com.project.spring.cleanmeet.common.model.PreSignedResponseDto;
import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
import com.project.spring.cleanmeet.common.util.S3Component;
import com.project.spring.cleanmeet.domain.image.entity.Category;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ImageService {
    private final S3Component s3Component;

    public PreSignedResponseDto createProfileUrl(String fileName, Authentication auth) {
        CustomUser customUser = (CustomUser) auth.getPrincipal();
        log.info("프로필 preSignedUrl 생성 시작");
        PreSignedResponseDto dto = s3Component.createPreSignedUrl(Category.PROFILE.getValue(), fileName, customUser.getId());
        log.info("프로필 preSignedUrl 생성 완료 dto={}", dto);

        return dto;
    }
}
