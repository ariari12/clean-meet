package com.project.spring.cleanmeet.common.security.jwt;


import com.project.spring.cleanmeet.common.exception.TokenExpiredException;
import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtUtil {


    private final SecretKey secretKey;
    private final long expiration;

    public JwtUtil(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration}") long expiration) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expiration = expiration;
    }

    // JWT 만들어주는 함수
    public String createToken(Authentication authentication) {
        CustomUser user = (CustomUser) authentication.getPrincipal();
        String authorities = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        String jwt = Jwts.builder()
                .claim("username", user.getUsername())
                .claim("id", user.getId())
                .claim("name", user.getName())
                .claim("authorities", authorities)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration)) //유효기간
                .signWith(secretKey)
                .compact();
        return jwt;
    }

    // JWT 까주는 함수
    public Claims extractToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .verifyWith(secretKey).build()
                    .parseSignedClaims(token)
                    .getPayload();
        }catch (ExpiredJwtException e) {
            throw new TokenExpiredException("엑세스 토큰이 만료되었습니다.");
        }catch (Exception e) {
            log.error("Failed to parse token: {}",e.getMessage());
            throw new RuntimeException("잘못된 토큰입니다.");
        }
        return claims;
    }

    // 리프레시 토큰 생성
//    public String createRefreshToken(String username) {
//        long refreshTokenValidTime = 1000L * 60L * 60L * 24L * 7L; // 7일 예시
//
//        // 여기서는 간단하게 JWT 포맷으로 Refresh Token을 만듭니다.
//        return Jwts.builder()
//                .subject("refresh-token")
//                .claim("username", username)
//                .issuedAt(new Date(System.currentTimeMillis()))
//                // Refresh Token 만료시간: 7일
//                .expiration(new Date(System.currentTimeMillis() + refreshTokenValidTime))
//                .signWith(secretKey)
//                .compact();
//    }
}
