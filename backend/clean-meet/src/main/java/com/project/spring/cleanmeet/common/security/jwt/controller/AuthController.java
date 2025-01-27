package com.project.spring.cleanmeet.common.security.jwt.controller;

import com.project.spring.cleanmeet.common.security.jwt.service.AuthService;
import com.project.spring.cleanmeet.common.security.jwt.dto.UserLoginRequestDto;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<?> loginJwt(@RequestBody UserLoginRequestDto userLoginRequestDto,
                                      HttpServletResponse httpServletResponse) {
        authService.loginWithJwt(userLoginRequestDto,httpServletResponse);

        return ResponseEntity.status(HttpStatus.OK).body("Login Successful");

    }
}
