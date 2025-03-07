package com.project.spring.cleanmeet.domain.user.conrotller;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceAnswerRequestDto;
import com.project.spring.cleanmeet.domain.servicerequest.service.ServiceAnswerService;
import com.project.spring.cleanmeet.domain.user.dto.user.UserProfileRequestDto;
import com.project.spring.cleanmeet.domain.user.dto.user.UserProfileResponseDto;
import com.project.spring.cleanmeet.domain.user.dto.user.UserRequestDto;
import com.project.spring.cleanmeet.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserApiController {
    private final UserService userService;
    private final ServiceAnswerService serviceAnswerService;


    @Operation(
            summary = "회원가입",
            description = "새로운 사용자를 등록합니다."
    )
    @PostMapping
    public ResponseEntity<String> users(@RequestBody UserRequestDto userRequestDto) {
        userService.personalSave(userRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(
            summary = "프로필 정보 조회",
            description = """
                    - 로그인 된 유저 프로필 조회
                    - S3 이미지 조회요청은 아래 URL로
                    - 도커 컴포즈 환경 `http://localhost/images/{S3_KEY}`
                    - 로컬 환경 `https://cleanmeetbucket.s3.ap-northeast-2.amazonaws.com/{S3_KEY}`
                    """,
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Authentication auth) {
        UserProfileResponseDto dto = userService.findUserProfile(auth);

        return ResponseEntity.ok(dto);
    }

    @Operation(summary = "프로필 받은 메시지 목록",
            description = "의뢰 응답을 레디스에서 가져옵니다.",
            security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/profile/messages")
    public ResponseEntity<List<ServiceAnswerRequestDto>> responseRedisList(Authentication auth) {
        List<ServiceAnswerRequestDto> allAnswers = serviceAnswerService.findAllAnswers(auth);
        return ResponseEntity.status(HttpStatus.OK).body(allAnswers);
    }


    @Operation(
            summary = "유저 프로필 업데이트",
            description = """
                    - 이미지를 저장할 경우 preSignedUrl API를 통해 S3Key를 받아와야함
                    """,
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(@RequestBody UserProfileRequestDto userProfileRequestDto,
                                                Authentication auth) {
        userService.updateProfile(userProfileRequestDto, auth);
        return ResponseEntity.ok().build();
    }



}
