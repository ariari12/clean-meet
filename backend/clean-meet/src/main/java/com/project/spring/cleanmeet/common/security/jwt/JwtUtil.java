package com.project.spring.cleanmeet.common.security.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtUtil {


    private final SecretKey secretKey;
    private final long expiration;

    public JwtUtil(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration}") long expiration) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
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
        } catch (Exception e) {
            System.out.println("Failed to parse token: " + e.getMessage());
            throw e; // 예외를 다시 던져 흐름을 알 수 있게 처리
        }
        System.out.println("claims = " + claims);
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
