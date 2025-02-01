package com.project.spring.cleanmeet.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {
    @Value("${spring.data.redis.host}")
    private String redisHost;
    @Value("${spring.data.redis.port}")
    private int redisPort;

    @Bean
    public LettuceConnectionFactory lettuceConnectionFactory() {
        //Lettuce 라는 라이브러리를 활용해 Redis 연결을 관리하는 객체를 생성하고
        // Redis 서버에 대한 정보(호스트, 포트)를 설정한다
        return new LettuceConnectionFactory(new RedisStandaloneConfiguration(redisHost, redisPort));
    }


    @Bean
    public RedisTemplate<String, Object> objectRedisTemplate(RedisConnectionFactory factory) {
        //Redis에 데이터를 입출력하기 위한 스프링 제공 템플릿
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        // Redis와 연결하기 위해 필요한 팩토리(RedisConnectionFactory)를 등록합니다
        template.setConnectionFactory(factory);
        // Redis의 Key를 tringRedisSerializer를 사용하여 키를 단순 문자열로 저장
        // 문자열 이외의 방식으로 직렬화하면, Redis CLI(커맨드라인)에서 키를 확인하기가 어려워지고, 관리하기도 복잡해집니다.
        template.setKeySerializer(new StringRedisSerializer());
        // Redis의 Value를 GenericJackson2JsonRedisSerializer는 Jackson 라이브러리를 활용하여 객체를 JSON 형태로 직렬화/역직렬화합니다.
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());

        return template;
    }

}
