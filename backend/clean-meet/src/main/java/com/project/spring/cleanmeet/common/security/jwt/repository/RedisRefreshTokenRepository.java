package com.project.spring.cleanmeet.common.security.jwt.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Slf4j
@Repository
@RequiredArgsConstructor
public class RedisRefreshTokenRepository {
    private final StringRedisTemplate stringRedisTemplate;

    public void saveRefreshToken(String userId, String refreshToken, long ttlInSeconds) {
        String key = "auth:refresh_token:" + userId;
        log.info("레디스 토큰 생성 : {}", key);
        stringRedisTemplate.opsForValue().set(key,refreshToken,ttlInSeconds, TimeUnit.SECONDS);
    }
    public String getRefreshToken(String userId) {
        String key = "auth:refresh_token:" + userId;
        log.info("레디스 토큰 조회 : {}", key);
        return stringRedisTemplate.opsForValue().get(key);
    }
    public void removeRefreshToken(String userId) {
        String key = "auth:refresh_token:" + userId;
        log.info("레디스 토큰 삭제 : {}", key);
        stringRedisTemplate.delete(key);
    }
}
