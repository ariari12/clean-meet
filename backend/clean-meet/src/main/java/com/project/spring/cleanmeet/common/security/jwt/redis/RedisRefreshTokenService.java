package com.project.spring.cleanmeet.common.security.jwt.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisRefreshTokenService {
    private final StringRedisTemplate stringRedisTemplate;

    public void saveRefreshToken(String userId, String refreshToken, long ttlInSeconds) {
        String key = "auth:refresh_token:" + userId;
        stringRedisTemplate.opsForValue().set(key,refreshToken,ttlInSeconds, TimeUnit.SECONDS);
    }
    public String getRefreshToken(String userId) {
        String key = "auth:refresh_token:" + userId;
        return stringRedisTemplate.opsForValue().get(key);
    }
    public void removeRefreshToken(String userId) {
        String key = "auth:refresh_token:" + userId;
        stringRedisTemplate.delete(key);
    }
}
