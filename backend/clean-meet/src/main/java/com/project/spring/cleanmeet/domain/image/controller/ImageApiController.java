package com.project.spring.cleanmeet.domain.image.controller;

import com.project.spring.cleanmeet.common.model.PreSignedResponseDto;
import com.project.spring.cleanmeet.domain.image.service.ImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageApiController {
    private final ImageService imageService;

    @Operation(
            summary = "presigned-url 생성",
            description = """
                    - S3에 이미지 저장할 url 생성
                    - DB에 저장할 조회용 S3Key 제공, 프로필 업데이트 API 에서 필요
                    """,
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @PostMapping("/presigned-url")
    public ResponseEntity<PreSignedResponseDto> createPreSigned(@RequestParam String fileName, Authentication auth) {
        PreSignedResponseDto dto = imageService.createProfileUrl(fileName, auth);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }
}
