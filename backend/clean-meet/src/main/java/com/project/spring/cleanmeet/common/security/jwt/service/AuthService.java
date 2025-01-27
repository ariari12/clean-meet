package com.project.spring.cleanmeet.common.security.jwt.service;

import com.project.spring.cleanmeet.common.security.jwt.JwtUtil;
import com.project.spring.cleanmeet.common.security.jwt.dto.UserLoginRequestDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtUtil jwtUtil;


    public String loginWithJwt(UserLoginRequestDto userLoginRequestDto, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(userLoginRequestDto.getEmail(), userLoginRequestDto.getPassword());
        // 아이디 비밀번호 검증
        Authentication auth = authenticationManagerBuilder.getObject().authenticate(authToken);

        // 검증된 유저 Authentication authentication 에 추가 컨트롤러에서 꺼내쓸 수 있음
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwt = jwtUtil.createToken(SecurityContextHolder.getContext().getAuthentication());

        setCookie(response, "JWT",jwt,3600);

//        String refreshToken = jwtUtil.createRefreshToken(data.get("username"));
//
//        // 4. Refresh Token DB 저장 or 캐싱 (Rotation을 위해서 '현재 유효한 토큰 목록'을 관리)
//        refreshTokenRepository.save(
//                RefreshToken.createRefreshToken(data.get("username"),refreshToken)
//        );

//        Cookie refreshCookie = new Cookie("REFRESH_TOKEN", refreshToken);
//        refreshCookie.setHttpOnly(true);
//        refreshCookie.setPath("/");
//        refreshCookie.setMaxAge(7 * 24 * 60 * 60); // 7일 예시
//        response.addCookie(refreshCookie);


        return jwt;

    }

    private void setCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }
}
