package com.project.spring.cleanmeet.common.security.jwt.controller;

import com.project.spring.cleanmeet.common.security.jwt.service.AuthService;
import com.project.spring.cleanmeet.common.security.jwt.dto.UserLoginRequestDto;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class LoginController {
    private final AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<String> loginJwt(@RequestBody UserLoginRequestDto userLoginRequestDto,
                                      HttpServletResponse httpServletResponse) {
        authService.loginWithJwt(userLoginRequestDto,httpServletResponse);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    @PostMapping("/refreshToken")
    public ResponseEntity<String> tokenRotation(@CookieValue("REFRESH_TOKEN") String refreshToken,
                                                @CookieValue("ACCESS_TOKEN") String expiredAccessToken,
                                                HttpServletResponse response) {
        authService.tokenRotation(refreshToken, expiredAccessToken, response);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
