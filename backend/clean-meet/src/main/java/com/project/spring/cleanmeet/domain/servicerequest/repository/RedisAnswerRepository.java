package com.project.spring.cleanmeet.domain.servicerequest.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceAnswerRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class RedisAnswerRepository {
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    private final String readKey = "service_answer:read:user_id:";
    private final String unReadKey = "service_answer:unread:user_id:";

    public void saveUnreadKey(ServiceAnswerRequestDto serviceAnswerRequestDto, Long userId) {

        redisTemplate.opsForList().leftPush(unReadKey+userId, serviceAnswerRequestDto);
    }

    public List<ServiceAnswerRequestDto> unreadServiceAnswers(Long userId) {
        List<Object> rawList = redisTemplate.opsForList().range(unReadKey + userId, 0, -1);
        // 주입받은 objectMapper 사용
        return Optional.ofNullable(rawList)
                .orElseGet(Collections::emptyList)
                .stream()
                .map(obj -> {
                    try {
                        return objectMapper.readValue(obj.toString(), ServiceAnswerRequestDto.class);
                    } catch (Exception e) {
                        throw new RuntimeException("JSON 역직렬화 오류", e);
                    }
                })
                .collect(Collectors.toList());
    }
}
