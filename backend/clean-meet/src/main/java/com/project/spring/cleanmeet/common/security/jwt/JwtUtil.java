package com.project.spring.cleanmeet.common.security.jwt;


import com.project.spring.cleanmeet.common.exception.InvalidTokenException;
import com.project.spring.cleanmeet.common.exception.TokenExpiredException;
import com.project.spring.cleanmeet.common.security.jwt.dto.CustomUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Component
public class JwtUtil {


    private final SecretKey secretKey;


    public JwtUtil(@Value("${jwt.secret}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }



    // JWT AccessToken 만들어주는 함수
    public String createToken(CustomUser user) {
        List<String> authorities = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        //유효기간
        return Jwts.builder()
                .claim("username", user.getUsername())
                .claim("id", user.getId())
                .claim("name", user.getName())
                .claim("authorities", authorities)
                .claim("category","accessToken")
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 30*60*1000)) //유효기간
                .signWith(secretKey)
                .compact();
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
            throw new TokenExpiredException("토큰이 만료되었습니다.");
        }catch (Exception e) {
            log.error("Failed to parse token: {}",e.getMessage());
            throw new InvalidTokenException("잘못된 토큰입니다.");
        }
        return claims;
    }

    public Claims extractExpiredAccessToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .verifyWith(secretKey).build()
                    .parseSignedClaims(token)
                    .getPayload();
        }catch (ExpiredJwtException e) {
            return e.getClaims();
        }catch (Exception e) {
            log.error("Failed to parse token: {}",e.getMessage());
            throw new InvalidTokenException("잘못된 토큰입니다.");
        }
        return claims;
    }

    // 리프레시 토큰 생성
    public String createRefreshToken(CustomUser user) {
        // 여기서는 간단하게 JWT 포맷으로 Refresh Token을 만듭니다.
        return Jwts.builder()
                .claim("id", user.getId())
                .claim("category","refreshToken")
                .issuedAt(new Date(System.currentTimeMillis()))
                // Refresh Token 만료시간: 1일
                .expiration(new Date(System.currentTimeMillis() + 60*60*24 * 1000))
                .signWith(secretKey)
                .compact();
    }
    public String createRefreshToken(String userId) {
        // 여기서는 간단하게 JWT 포맷으로 Refresh Token을 만듭니다.
        return Jwts.builder()
                .claim("id", userId)
                .claim("category","refreshToken")
                .issuedAt(new Date(System.currentTimeMillis()))
                // Refresh Token 만료시간: 1일
                .expiration(new Date(System.currentTimeMillis() + 60*60*24 * 1000))
                .signWith(secretKey)
                .compact();
    }


    public List<GrantedAuthority> extractAuthorities(Claims claims) {
        List<String> authoritiesList = (List<String>) claims.get("authorities", List.class);
        return authoritiesList.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
