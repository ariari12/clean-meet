package com.project.spring.cleanmeet.domain.user.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@RequiredArgsConstructor
public class RedisCompanyRepository {
    private final StringRedisTemplate stringRedisTemplate;

    public void saveCompanyTag(Long companyId, List<String> tags) {
        for(String tag : tags){
            // 회사 ID별 태그 저장
            stringRedisTemplate.opsForSet().add("company:"+companyId+":tags", tag);
            // 태그별 회사 ID 저장
            stringRedisTemplate.opsForSet().add("tag:"+tag, String.valueOf(companyId));
        }
    }
    public void deleteCompanyTag(Long companyId, List<String> tags) {
        for(String tag : tags){
            stringRedisTemplate.opsForSet().remove("company:"+companyId+":tags", tag);
            stringRedisTemplate.opsForSet().remove("tag:"+tag, String.valueOf(companyId));
        }

        // 회사 태그에 값이 없다면 태그 자체를 삭제
        Long size = stringRedisTemplate.opsForSet().size("company:" + companyId + "tags");
        if(size == null || size == 0){
            stringRedisTemplate.delete("company:"+companyId+"tags:");
        }
    }

    public List<String> findCompanyTags(Long companyId) {
        return Optional.ofNullable(stringRedisTemplate.opsForSet()
                .members("company:" + companyId + ":tags"))
                .orElse(Collections.emptySet())
                .stream()
                .toList();
    }

}
