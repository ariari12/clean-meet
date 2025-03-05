package com.project.spring.cleanmeet.domain.servicerequest.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.spring.cleanmeet.domain.servicerequest.dto.ServiceAnswerRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class RedisAnswerRepository {
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    public void save(ServiceAnswerRequestDto serviceAnswerRequestDto, Long userId) {
        String key = "service_answer:user_id:"+userId;
        try{
            String json = objectMapper.writeValueAsString(serviceAnswerRequestDto);
            redisTemplate.opsForList().leftPush(key, json);
        }catch (Exception e){
            throw new RuntimeException("JSON 변환 오류", e);
        }
    }

    public List<ServiceAnswerRequestDto> getServiceAnswerList(Long userId) {
        String key = "service_answer:user_id:"+userId;
        List<Object> range = redisTemplate.opsForList().range(key, 0, -1);

        if (range == null || range.isEmpty()) {
            return new ArrayList<>(); // 데이터가 없으면 빈 리스트 반환
        }

        return range.stream().map(obj -> objectMapper.convertValue(obj, ServiceAnswerRequestDto.class))
                .collect(Collectors.toList());
    }
}
