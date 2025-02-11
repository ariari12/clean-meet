package com.project.spring.cleanmeet.common.security.jwt.service;

import com.project.spring.cleanmeet.common.exception.InvalidTokenException;
import com.project.spring.cleanmeet.common.security.jwt.JwtUtil;
import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
import com.project.spring.cleanmeet.common.security.jwt.dto.UserLoginRequestDto;
import com.project.spring.cleanmeet.common.security.jwt.dto.UserLoginResponseDto;
import com.project.spring.cleanmeet.common.security.jwt.redis.RedisRefreshTokenService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final RedisRefreshTokenService redisRefreshTokenService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtUtil jwtUtil;

    private static final int TOKEN_TTL = 60 * 60 * 24;  // 1일

    public UserLoginResponseDto loginWithJwt(UserLoginRequestDto userLoginRequestDto, HttpServletResponse response) {
        log.info("로그인 로직 시작 : {}", userLoginRequestDto);
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(userLoginRequestDto.getEmail(), userLoginRequestDto.getPassword());
        // 아이디 비밀번호 검증
        Authentication auth = authenticationManagerBuilder.getObject().authenticate(authToken);

        // 검증된 유저 Authentication authentication 에 추가 컨트롤러에서 꺼내쓸 수 있음
        SecurityContextHolder.getContext().setAuthentication(auth);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUser customUser = (CustomUser) authentication.getPrincipal();
        log.info("로그인 유저 검증 성공 : {}", customUser);

        String newAccessToken = jwtUtil.createToken(customUser);
        log.info("새로운 엑세스 토큰 생성 : {}", newAccessToken);

        String newRefreshToken = jwtUtil.createRefreshToken(customUser);
        // 4. Refresh Token DB 저장 or 캐싱 (Rotation을 위해서 '현재 유효한 토큰 목록'을 관리)
        redisRefreshTokenService.saveRefreshToken(customUser.getId().toString(),newRefreshToken,TOKEN_TTL);
        log.info("새로운 리프레시 토큰 생성 : {}", newRefreshToken);

        createCookie(response, "REFRESH_TOKEN",newRefreshToken,TOKEN_TTL);

        UserLoginResponseDto userLoginResponseDto =
                new UserLoginResponseDto(newAccessToken, customUser.getUsername(), customUser.getName());
        log.info("유저 로그인 성공 {}", userLoginResponseDto);
        return userLoginResponseDto;
    }

    public String tokenRotation(String refreshToken, String authorizationHeader, HttpServletResponse response) {
        //토큰 추출
        Claims claims = jwtUtil.extractToken(refreshToken);
        String userId = claims.get("id", String.class);
        // 레디스 검증
        String savedRefreshToken = redisRefreshTokenService.getRefreshToken(userId);
        if( savedRefreshToken == null || !savedRefreshToken.equals(refreshToken)) {
            throw new InvalidTokenException("Refresh token 만료 또는 유효하지 않습니다.");
        }
        // 2. 새로운 액세스 토큰 및 리프레시 토큰 발급
        String expiredAccessToken = extractAccessToken(authorizationHeader);
        CustomUser customUser = extractCustomUserFromExpiredToken(expiredAccessToken);
        String newAccessToken = jwtUtil.createToken(customUser);
        String newRefreshToken = jwtUtil.createRefreshToken(userId);

        updateRefreshTokenRedis(userId, newRefreshToken, TOKEN_TTL);
        createCookie(response, "REFRESH_TOKEN",newRefreshToken,TOKEN_TTL);

        return newAccessToken;
    }

    private CustomUser extractCustomUserFromExpiredToken(String expiredAccessToken) {
        Claims accessTokenClaims = jwtUtil.extractExpiredAccessToken(expiredAccessToken);
        CustomUser customUser = new CustomUser(
                (String) accessTokenClaims.get("username"),
                "",
                jwtUtil.extractAuthorities(accessTokenClaims)
        );
        customUser.setId((String) accessTokenClaims.get("id"));
        customUser.setName((String) accessTokenClaims.get("name"));
        return customUser;
    }

    private void updateRefreshTokenRedis(String userId, String newRefreshToken, int ttl) {
        redisRefreshTokenService.removeRefreshToken(userId);
        redisRefreshTokenService.saveRefreshToken(userId, newRefreshToken,ttl);
    }

    private void createCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        //cookie.setSecure(true);
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }

    public String extractAccessToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            // "Bearer " 제거
            return authorizationHeader.substring(7);
        }
        throw new IllegalArgumentException("Authorization 헤더가 유효하지 않습니다.");
    }
}
