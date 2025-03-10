package com.project.spring.cleanmeet.domain.servicerequest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceAnswerRedisDto {

    private String title;

    private String description;

    private LocalDateTime scheduledDateTime;

    private Boolean isRead;

    private Long companyId;

    private Long serviceRequestId;
}
