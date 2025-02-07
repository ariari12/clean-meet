package com.project.spring.cleanmeet.domain.servicerequest.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceResponseDto {

    private String description;

    private LocalDateTime scheduledDateTime;

    private Long companyId;

    private Long serviceRequestId;
}
