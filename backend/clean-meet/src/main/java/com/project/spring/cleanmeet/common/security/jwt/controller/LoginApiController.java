package com.project.spring.cleanmeet.common.security.jwt.controller;

import com.project.spring.cleanmeet.common.security.jwt.service.AuthService;
import com.project.spring.cleanmeet.common.security.jwt.dto.UserLoginRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class LoginApiController {
    private final AuthService authService;


    @Operation(summary = "JWT 로그인", description = "이메일과 비밀번호로 로그인하여 액세스 토큰은 body 에 리프레시 토큰은 쿠키에 발급받습니다.")
    @PostMapping("/login")
    public ResponseEntity<String> loginJwt(@RequestBody UserLoginRequestDto userLoginRequestDto,
                                      HttpServletResponse httpServletResponse) {
        String accessToken = authService.loginWithJwt(userLoginRequestDto, httpServletResponse);
        return ResponseEntity.status(HttpStatus.OK).body(accessToken);
    }

    @Operation(
            summary = "리프레시 토큰을 사용하여 새로운 액세스 토큰 발급",
            description = "쿠키에 저장된 리프레시 토큰을 사용해 만료된 액세스 토큰을 갱신합니다.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @PostMapping("/refreshToken")
    public ResponseEntity<String> tokenRotation(
            @Parameter(description = "리프레시 토큰을 쿠키에서 가져옵니다.", example = "리프레시 토큰 값")
            @CookieValue("REFRESH_TOKEN") String refreshToken,
            @Parameter(description = "Bearer 액세스 토큰", example = "Bearer 토큰값")
            @RequestHeader("Authorization") String authorizationHeader,
            HttpServletResponse response) {
        String accessToken = authService.tokenRotation(refreshToken, authorizationHeader, response);

        return ResponseEntity.status(HttpStatus.OK).body(accessToken);
    }
}
