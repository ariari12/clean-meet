package com.project.spring.cleanmeet.common.security.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilterErrorResponse {
    private int status;      // HTTP 상태 코드
    private HttpStatus error;    // 상태 코드에 대한 설명
    private String message;  // 상세 에러 메시지
    private String path;     // 요청된 경로
}
