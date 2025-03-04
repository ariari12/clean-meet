package com.project.spring.cleanmeet.domain.servicerequest.repository;

import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceAnswerRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RedisAnswerRepository {
    private final RedisTemplate<String, Object> redisTemplate;

    public void save(ServiceAnswerRequestDto serviceAnswerRequestDto, Long userId) {
        String key = "service_answer:user_id:"+userId;
        redisTemplate.opsForList().leftPush(key, serviceAnswerRequestDto);
    }
}
